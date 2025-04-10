
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface TierInfoProps {
  currentTier: "Silver" | "Gold" | "Platinum";
}

const tiers = [
  {
    name: "Silver",
    requiredPoints: 0,
    benefits: [
      "5% discount on every meal",
      "Complimentary birthday dessert",
      "Early access to new menu items"
    ],
    color: "bg-gray-300"
  },
  {
    name: "Gold",
    requiredPoints: 500,
    benefits: [
      "10% discount on every meal",
      "Complimentary appetizer with each meal",
      "Invitations to exclusive tasting events",
      "Priority seating reservations"
    ],
    color: "bg-yellow-400"
  },
  {
    name: "Platinum",
    requiredPoints: 1500,
    benefits: [
      "15% discount on every meal",
      "Complimentary bottle of wine on special occasions",
      "Access to a dedicated concierge service for reservations",
      "Invitations to VIP events and chef's table experiences"
    ],
    color: "bg-gray-700"
  }
];

export function TierInfo({ currentTier }: TierInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Loyalty Tiers</CardTitle>
        <CardDescription>
          Your current tier: <span className="inline-block"><Badge className={`${currentTier === 'Silver' ? 'bg-gray-300' : currentTier === 'Gold' ? 'bg-yellow-400' : 'bg-gray-700'} text-black`}>{currentTier}</Badge></span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`p-4 rounded-md ${tier.name === currentTier ? 'border-2 border-yellow-400' : 'border border-muted'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full ${tier.color}`}></div>
                <h3 className="font-semibold">{tier.name} Tier</h3>
                {tier.requiredPoints > 0 && (
                  <span className="text-xs text-muted-foreground ml-auto">
                    {tier.requiredPoints} points to unlock
                  </span>
                )}
              </div>
              <ul className="text-sm space-y-1">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
