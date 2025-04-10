
import React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CreditCard, Coffee, Utensils, Hotel, PlusCircle, MinusCircle } from "lucide-react";

interface TransactionItemProps {
  type: "purchase" | "redemption";
  businessType: "amka" | "mawimbi" | "kasa";
  date: Date;
  points: number;
  description: string;
  amount?: number;
  className?: string;
}

export function TransactionItem({
  type,
  businessType,
  date,
  points,
  description,
  amount,
  className,
}: TransactionItemProps) {
  const getIcon = () => {
    switch (businessType) {
      case "amka":
        return <Coffee className="h-5 w-5" />;
      case "mawimbi":
        return <Utensils className="h-5 w-5" />;
      case "kasa":
        return <Hotel className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getBusinessColor = () => {
    switch (businessType) {
      case "amka":
        return "text-eco-coffee bg-eco-latte/20";
      case "mawimbi":
        return "text-eco-ocean bg-eco-seafoam/20";
      case "kasa":
        return "text-eco-bamboo bg-eco-sand/20";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <div className={cn("flex items-center gap-4 p-4 rounded-lg border", className)}>
      <div className={cn("rounded-full p-2", getBusinessColor())}>
        {getIcon()}
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium">{description}</h4>
        <div className="flex justify-between items-center mt-1">
          <time className="text-sm text-muted-foreground">
            {format(date, "MMM d, yyyy • h:mm a")}
          </time>
          {amount && (
            <span className="text-sm font-medium">
              ${amount.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        {type === "purchase" ? (
          <PlusCircle className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <MinusCircle className="h-4 w-4 text-amber-500 mr-1" />
        )}
        <span className={cn(
          "font-medium",
          type === "purchase" ? "text-green-600" : "text-amber-600"
        )}>
          {type === "purchase" ? "+" : "-"}{points} pts
        </span>
      </div>
    </div>
  );
}
