import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";

const renderSkeletonCards = () => {
  const skeletonCard = (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Skeleton className="w-full h-10 rounded-xl" />
        </div>
        <CardDescription className="line-clamp-2 pt-1">
          <Skeleton className="rounded-xl" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <ScrollArea className="h-10" />
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-3">
        <Skeleton className="rounded-xl" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => (
        <React.Fragment key={index}>{skeletonCard}</React.Fragment>
      ))}
    </div>
  );
}

export default renderSkeletonCards