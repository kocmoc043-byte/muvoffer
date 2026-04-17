import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 10;
const GAP_MM = 4;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - MARGIN_MM * 2;
const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - MARGIN_MM * 2;
const PAGE_BG = "#0f0a17";

async function captureSection(el: HTMLElement) {
  return html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight,
    ignoreElements: (element) => element.classList?.contains("no-print") ?? false,
  });
}

function paintBg(pdf: jsPDF) {
  pdf.setFillColor(PAGE_BG);
  pdf.rect(0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, "F");
}

function addCanvasToPdf(
  pdf: jsPDF,
  canvas: HTMLCanvasElement,
  y: number,
  targetHeightMM?: number
) {
  const widthMM = CONTENT_WIDTH_MM;
  const mmPerPx = CONTENT_WIDTH_MM / canvas.width;
  const heightMM = targetHeightMM ?? canvas.height * mmPerPx;
  const imgData = canvas.toDataURL("image/png");
  pdf.addImage(imgData, "PNG", MARGIN_MM, y, widthMM, heightMM);
  return heightMM;
}

export async function exportPdf(
  rootSelector = "[data-pdf-root]",
  filename = "MUV-trainer-brief.pdf"
) {
  const root = document.querySelector(rootSelector) as HTMLElement | null;
  if (!root) return;

  const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-pdf-section]"));
  if (sections.length === 0) return;

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  paintBg(pdf);

  let currentY = MARGIN_MM;

  for (const section of sections) {
    const canvas = await captureSection(section);
    const mmPerPx = CONTENT_WIDTH_MM / canvas.width;
    const renderHeightMM = canvas.height * mmPerPx;
    const remainingMM = A4_HEIGHT_MM - MARGIN_MM - currentY;

    if (renderHeightMM <= remainingMM) {
      currentY += addCanvasToPdf(pdf, canvas, currentY) + GAP_MM;
      continue;
    }

    if (currentY > MARGIN_MM) {
      pdf.addPage();
      paintBg(pdf);
      currentY = MARGIN_MM;
    }

    if (renderHeightMM <= CONTENT_HEIGHT_MM) {
      currentY += addCanvasToPdf(pdf, canvas, currentY) + GAP_MM;
      continue;
    }

    const pageHeightPx = Math.floor(CONTENT_HEIGHT_MM / mmPerPx);
    let offsetPx = 0;

    while (offsetPx < canvas.height) {
      const sliceHeightPx = Math.min(pageHeightPx, canvas.height - offsetPx);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceHeightPx;

      const ctx = sliceCanvas.getContext("2d");
      if (!ctx) break;

      ctx.drawImage(
        canvas,
        0,
        offsetPx,
        canvas.width,
        sliceHeightPx,
        0,
        0,
        canvas.width,
        sliceHeightPx
      );

      const sliceHeightMM = sliceHeightPx * mmPerPx;
      addCanvasToPdf(pdf, sliceCanvas, MARGIN_MM, sliceHeightMM);
      offsetPx += sliceHeightPx;

      if (offsetPx < canvas.height) {
        pdf.addPage();
        paintBg(pdf);
      } else {
        currentY = MARGIN_MM + sliceHeightMM + GAP_MM;
      }
    }
  }

  pdf.save(filename);
}
