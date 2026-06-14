interface ImageZoomProps {
  children: React.ReactNode;
  className?: string;
}

export default function ImageZoom({ children, className = "" }: ImageZoomProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="transition-transform duration-300 ease-out hover:scale-110">
        {children}
      </div>
    </div>
  );
}
