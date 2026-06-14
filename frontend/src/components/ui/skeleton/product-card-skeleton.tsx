import Skeleton from "./skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border border-outline-variant">
      <Skeleton className="w-full aspect-square" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-8 w-full mt-4" />
      </div>
    </div>
  );
}
