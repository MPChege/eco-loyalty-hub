
import React from "react";
import { cn } from "@/lib/utils";
import { Leaf, Waves, PalmtreeIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type BusinessType = "amka" | "mawimbi" | "kasa";

interface LoyaltyCardProps {
  businessType: BusinessType;
  customerName: string;
  membershipId: string;
  points: number;
  tier: string;
  className?: string;
}

const getCardStyles = (businessType: BusinessType) => {
  switch (businessType) {
    case "amka":
      return {
        bgColor: "bg-gradient-to-br from-eco-latte to-eco-coffee",
        icon: <Leaf className="h-8 w-8 text-eco-coffee" />,
        pattern: "eco-pattern",
        name: "Amka Cafe",
      };
    case "mawimbi":
      return {
        bgColor: "bg-gradient-to-br from-eco-seafoam to-eco-ocean",
        icon: <Waves className="h-8 w-8 text-eco-ocean" />,
        pattern: "wave-pattern",
        name: "Mawimbi",
      };
    case "kasa":
      return {
        bgColor: "bg-gradient-to-br from-eco-sand to-eco-bamboo",
        icon: <PalmtreeIcon className="h-8 w-8 text-eco-bamboo" />,
        pattern: "eco-pattern",
        name: "Kasa Resort",
      };
    default:
      return {
        bgColor: "bg-gradient-to-br from-eco-paper to-eco-leaf",
        icon: <Leaf className="h-8 w-8" />,
        pattern: "eco-pattern",
        name: "Eco Loyalty",
      };
  }
};

export function LoyaltyCard({
  businessType,
  customerName,
  membershipId,
  points,
  tier,
  className,
}: LoyaltyCardProps) {
  const { bgColor, icon, pattern, name } = getCardStyles(businessType);

  return (
    <Card
      className={cn(
        "p-6 relative overflow-hidden min-h-[200px] w-full max-w-md",
        bgColor,
        className
      )}
    >
      <div className={`absolute inset-0 ${pattern} opacity-20`}></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium opacity-80">DIGITAL MEMBERSHIP</p>
            <h3 className="font-bold text-xl mt-1">{name}</h3>
          </div>
          <div>{icon}</div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium opacity-80">MEMBER</p>
          <h4 className="font-bold text-lg">{customerName}</h4>
          <p className="text-xs mt-1 opacity-70">ID: {membershipId}</p>
        </div>

        <div className="mt-4 flex justify-between items-end">
          <div>
            <p className="text-xs font-medium opacity-80">MEMBERSHIP TIER</p>
            <p className="font-bold">{tier}</p>
          </div>
          <div>
            <p className="text-xs font-medium opacity-80">POINTS</p>
            <p className="font-bold text-xl">{points}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
