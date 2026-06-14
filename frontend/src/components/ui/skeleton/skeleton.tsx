import { uiContent } from "@/lib/content";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-surface-container-high rounded-md ${className}`}
      role="status"
      aria-label={uiContent.skeleton.loadingAriaLabel}
    />
  );
}
