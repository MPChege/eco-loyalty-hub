
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Leaf } from "lucide-react";

interface RewardCardProps {
  title: string;
  description: string;
  pointsCost: number;
  imageUrl?: string;
  isEcoFriendly?: boolean;
  onRedeem: () => void;
  available?: boolean;
  className?: string;
}

export function RewardCard({
  title,
  description,
  pointsCost,
  imageUrl,
  isEcoFriendly = false,
  onRedeem,
  available = true,
  className,
}: RewardCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      {imageUrl && (
        <div className="h-40 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {isEcoFriendly && (
              <div className="flex items-center text-eco-leaf text-xs mt-1 gap-1">
                <Leaf className="h-3 w-3" />
                <span>Eco-friendly reward</span>
              </div>
            )}
          </div>
          <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-sm font-medium">
            {pointsCost} points
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={onRedeem}
          disabled={!available}
          className="w-full"
          variant={available ? "default" : "outline"}
        >
          <Gift className="mr-2 h-4 w-4" />
          {available ? "Redeem" : "Not enough points"}
        </Button>
      </CardFooter>
    </Card>
  );
}
