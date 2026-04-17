import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 10;
const GAP_MM = 4;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - MARGIN_MM * 2;
const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - MARGIN_MM * 2;

// Фон страницы PDF (соответствует --background: 270 30% 6%)
const PAGE_BG = "#0f0a17";

async function captureSection(el: HTMLElement) {
  return await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
    windowWidth: el.scrollWidth,
  });
}

function paintBg(pdf: jsPDF) {
  pdf.setFillColor(PAGE_BG);
  pdf.rect(0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, "F");
}

/**
 * Экспортирует элементы с [data-pdf-section] в PDF, не разрезая секции
 * между страницами. Если секция выше страницы — она аккуратно режется
 * на куски по высоте страницы.
 */
export async function exportPdf(rootSelector = "[data-pdf-root]", filename = "MUV-trainer-brief.pdf") {
  const root = document.querySelector(rootSelector) as HTMLElement | null;
  if (!root) return;

  const sections = Array.from(
    root.querySelectorAll<HTMLElement>("[data-pdf-section]")
  );
  if (sections.length === 0) return;

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  paintBg(pdf);

  let currentY = MARGIN_MM;

  for (let i = 0; i < sections.length; i++) {
    const canvas = await captureSection(sections[i]);
    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;
    const scale = CONTENT_WIDTH_MM / (imgWidthPx / 2);
    const renderWidthMM = CONTENT_WIDTH_MM;
    const renderHeightMM = (imgHeightPx / 2) * scale;

    const imgData = canvas.toDataURL("image/jpeg", 0.92);

    // Если секция помещается на текущую страницу — кладём целиком
    const remaining = A4_HEIGHT_MM - MARGIN_MM - currentY;
    if (renderHeightMM <= remaining) {
      pdf.addImage(imgData, "JPEG", MARGIN_MM, currentY, renderWidthMM, renderHeightMM);
      currentY += renderHeightMM + GAP_MM;
      continue;
    }

    // Не помещается — начинаем с новой страницы
    if (currentY > MARGIN_MM) {
      pdf.addPage();
      paintBg(pdf);
      currentY = MARGIN_MM;
    }

    // Если секция в принципе влезает на пустую страницу — кладём целиком
    if (renderHeightMM <= CONTENT_HEIGHT_MM) {
      pdf.addImage(imgData, "JPEG", MARGIN_MM, currentY, renderWidthMM, renderHeightMM);
      currentY += renderHeightMM + GAP_MM;
      continue;
    }

    // Очень длинная секция — режем canvas на куски по высоте страницы
    const pageHeightPx = (CONTENT_HEIGHT_MM / scale) * 2;
    let offsetPx = 0;
    while (offsetPx < imgHeightPx) {
      const sliceHeightPx = Math.min(pageHeightPx, imgHeightPx - offsetPx);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = imgWidthPx;
      sliceCanvas.height = sliceHeightPx;
      const ctx = sliceCanvas.getContext("2d")!;
      ctx.drawImage(
        canvas,
        0,
        offsetPx,
        imgWidthPx,
        sliceHeightPx,
        0,
        0,
        imgWidthPx,
        sliceHeightPx
      );
      const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.92);
      const sliceHeightMM = (sliceHeightPx / 2) * scale;

      pdf.addImage(sliceData, "JPEG", MARGIN_MM, MARGIN_MM, renderWidthMM, sliceHeightMM);
      offsetPx += sliceHeightPx;

      if (offsetPx < imgHeightPx) {
        pdf.addPage();
        paintBg(pdf);
      } else {
        currentY = MARGIN_MM + sliceHeightMM + GAP_MM;
      }
    }
  }

  pdf.save(filename);
}
