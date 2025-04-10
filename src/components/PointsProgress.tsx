
import React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface PointsProgressProps {
  currentPoints: number;
  nextTierPoints: number;
  currentTier: string;
  nextTier: string;
  className?: string;
}

export function PointsProgress({
  currentPoints,
  nextTierPoints,
  currentTier,
  nextTier,
  className,
}: PointsProgressProps) {
  const progressPercent = Math.min((currentPoints / nextTierPoints) * 100, 100);
  const pointsRemaining = nextTierPoints - currentPoints;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{currentTier}</span>
        <span className="font-medium">{nextTier}</span>
      </div>
      
      <Progress value={progressPercent} className="h-2" />
      
      <div className="flex justify-between text-sm">
        <span className="text-green-600 font-medium">{currentPoints} points</span>
        <span className="text-muted-foreground">
          {pointsRemaining > 0 
            ? `${pointsRemaining} points to ${nextTier}` 
            : `You've reached ${nextTier}!`
          }
        </span>
      </div>
    </div>
  );
}
