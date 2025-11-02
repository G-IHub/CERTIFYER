import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function TestimonialsSkeleton() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/6" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Skeleton className="h-44 rounded-md" />
        <Skeleton className="h-44 rounded-md" />
        <Skeleton className="h-44 rounded-md" />
      </div>
      <div className="mt-6">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="h-28 rounded-md" />
          <Skeleton className="h-28 rounded-md" />
          <Skeleton className="h-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}
