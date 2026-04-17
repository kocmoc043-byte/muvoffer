interface PhoneMockProps {
  src: string;
  alt: string;
  caption?: string;
  rotate?: string;
  imageClassName?: string;
}

const PhoneMock = ({
  src,
  alt,
  caption,
  rotate = "0deg",
  imageClassName,
}: PhoneMockProps) => {
  return (
    <div className="flex flex-col items-center gap-3" style={{ transform: `rotate(${rotate})` }}>
      <div className="relative w-[200px] h-[420px] rounded-[2.5rem] bg-surface-elevated p-2 shadow-[var(--shadow-card)] ring-1 ring-brand/20 overflow-hidden">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-background rounded-b-2xl z-10" />
        <div className="w-full h-full overflow-hidden rounded-[2rem] bg-background">
          <img
            src={src}
            alt={alt}
            className={imageClassName ?? "w-full h-full object-cover object-top"}
            loading="lazy"
          />
        </div>
      </div>
      {caption && (
        <p className="text-xs text-muted-foreground text-center max-w-[200px]">{caption}</p>
      )}
    </div>
  );
};

export default PhoneMock;
