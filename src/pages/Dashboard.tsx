
import React from "react";
import { Layout } from "@/components/Layout";
import { LoyaltyCard } from "@/components/LoyaltyCard";
import { PointsProgress } from "@/components/PointsProgress";
import { PartnerShowcase } from "@/components/PartnerShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Gift, Zap, TrendingUp, ArrowRight, Coffee } from "lucide-react";
import { RewardCard } from "@/components/RewardCard";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { TierInfo } from "@/components/TierInfo";

const Dashboard = () => {
  const { toast } = useToast();
  
  // This would come from API/backend in a real application
  const userData = {
    name: "Alex Johnson",
    memberId: "AMKA-27491",
    points: 750,
    tier: "Gold",
    nextTier: "Platinum",
    nextTierPoints: 1500,
    lastVisit: "Amka Cafe",
  };
  
  const featuredRewards = [
    {
      id: 1,
      title: "Free Coffee",
      description: "One complimentary coffee of your choice at Amka Cafe",
      pointsCost: 200,
      businessType: "amka",
      imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      title: "Beach Dinner",
      description: "Candlelit dinner for two at Mawimbi beach restaurant",
      pointsCost: 800,
      businessType: "mawimbi",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 3,
      title: "Spa Treatment",
      description: "30-minute relaxing massage at Kasa Resort's spa",
      pointsCost: 600,
      businessType: "kasa",
      imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];
  
  const handleRewardRedeem = (rewardId: number) => {
    toast({
      title: "Reward Added to Your Wallet",
      description: "You can view and use it from your rewards page",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userData.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground mt-1">
            Your Amka Cafe rewards await. Start earning and redeeming today!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LoyaltyCard
              businessType="amka"
              customerName={userData.name}
              membershipId={userData.memberId}
              points={userData.points}
              tier={userData.tier}
            />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Progress to {userData.nextTier}</CardTitle>
              </CardHeader>
              <CardContent>
                <PointsProgress
                  currentPoints={userData.points}
                  nextTierPoints={userData.nextTierPoints}
                  currentTier={userData.tier}
                  nextTier={userData.nextTier}
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Tabs defaultValue="stats">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="stats">Quick Stats</TabsTrigger>
                <TabsTrigger value="actions">Quick Actions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats" className="space-y-4">
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Points</p>
                      <p className="text-2xl font-bold">{userData.points}</p>
                    </div>
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Membership Level</p>
                      <p className="text-2xl font-bold">{userData.tier}</p>
                    </div>
                    <div className="h-12 w-12 bg-amber-400/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-amber-400" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Last Visit</p>
                      <p className="text-2xl font-bold">{userData.lastVisit}</p>
                    </div>
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Coffee className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="actions">
                <Card>
                  <CardContent className="p-6 flex flex-col gap-4">
                    <Button className="w-full justify-start" asChild>
                      <Link to="/rewards">
                        <Gift className="mr-2 h-4 w-4" />
                        Browse All Rewards
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="mr-2 h-4 w-4" />
                      Scan QR Code to Earn Points
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/history">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        View Transaction History
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Add Tier Info Component */}
        <TierInfo currentTier={userData.tier as "Silver" | "Gold" | "Platinum"} />
        
        {/* Amka Cafe Showcase */}
        <PartnerShowcase className="mb-8" />
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Featured Rewards</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/rewards">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                title={reward.title}
                description={reward.description}
                pointsCost={reward.pointsCost}
                imageUrl={reward.imageUrl}
                isEcoFriendly={false}
                onRedeem={() => handleRewardRedeem(reward.id)}
                available={userData.points >= reward.pointsCost}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
