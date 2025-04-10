
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { RewardCard } from "@/components/RewardCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Rewards = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // This would come from API in a real application
  const [userData, setUserData] = useState({
    points: 750,
  });
  
  const [rewardsList, setRewardsList] = useState([
    {
      id: 1,
      title: "Free Coffee",
      description: "One complimentary coffee of your choice at Amka Cafe",
      pointsCost: 200,
      type: "amka",
      imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      isEcoFriendly: true,
    },
    {
      id: 2,
      title: "Beach Dinner",
      description: "Candlelit dinner for two at Mawimbi beach restaurant",
      pointsCost: 800,
      type: "mawimbi",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 3,
      title: "Spa Treatment",
      description: "30-minute relaxing massage at Kasa Resort's spa",
      pointsCost: 600,
      type: "kasa",
      imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 4,
      title: "Reusable Cup",
      description: "Eco-friendly bamboo cup for your daily coffee",
      pointsCost: 300,
      type: "amka",
      imageUrl: "https://images.unsplash.com/photo-1581541535394-aaa7bcd0a664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      isEcoFriendly: true,
    },
    {
      id: 5,
      title: "Cooking Class",
      description: "Learn to cook local cuisine with our expert chefs",
      pointsCost: 500,
      type: "mawimbi",
      imageUrl: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
    {
      id: 6,
      title: "Pool Day Pass",
      description: "Full day access to Kasa Resort's premium pools",
      pointsCost: 400,
      type: "kasa",
      imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 7,
      title: "Pastry Box",
      description: "Box of 6 assorted pastries from Amka Cafe",
      pointsCost: 250,
      type: "amka",
      imageUrl: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 8,
      title: "Sunset Cruise",
      description: "2-hour cruise along the coast with refreshments",
      pointsCost: 900,
      type: "mawimbi",
      imageUrl: "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      isEcoFriendly: true,
    },
    {
      id: 9,
      title: "Garden Tour",
      description: "Guided tour of Kasa Resort's organic gardens",
      pointsCost: 150,
      type: "kasa",
      imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      isEcoFriendly: true,
    },
  ]);
  
  const handleRewardRedeem = (rewardId: number) => {
    // Find the reward
    const rewardToRedeem = rewardsList.find(reward => reward.id === rewardId);
    
    if (!rewardToRedeem) return;
    
    // Check if user has enough points
    if (userData.points < rewardToRedeem.pointsCost) {
      toast({
        title: "Not Enough Points",
        description: `You need ${rewardToRedeem.pointsCost - userData.points} more points to redeem this reward.`,
        variant: "destructive"
      });
      return;
    }
    
    // Deduct points and update UI
    setUserData(prev => ({
      ...prev,
      points: prev.points - rewardToRedeem.pointsCost
    }));
    
    // Notify user
    toast({
      title: "Reward Redeemed!",
      description: `You have successfully redeemed ${rewardToRedeem.title}`,
    });
  };
  
  const filterRewardsByType = (type: string) => {
    if (type === "all") {
      return rewardsList.filter(reward => 
        reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (type === "eco-friendly") {
      return rewardsList.filter(reward => 
        reward.isEcoFriendly && (
          reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reward.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    return rewardsList.filter(reward => 
      reward.type === type && (
        reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Rewards</h1>
          <p className="text-muted-foreground mt-1">
            Browse and redeem rewards with your points
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rewards..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Badge variant="outline" className="bg-yellow-400/10 hover:bg-yellow-400/20 text-black">
              Your Points: {userData.points}
            </Badge>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="all">All Rewards</TabsTrigger>
            <TabsTrigger value="amka">Amka Cafe</TabsTrigger>
            <TabsTrigger value="mawimbi">Mawimbi</TabsTrigger>
            <TabsTrigger value="kasa">Kasa Resort</TabsTrigger>
            <TabsTrigger value="eco-friendly">Eco-Friendly</TabsTrigger>
          </TabsList>
          
          {["all", "amka", "mawimbi", "kasa", "eco-friendly"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterRewardsByType(tab).length > 0 ? (
                  filterRewardsByType(tab).map((reward) => (
                    <RewardCard
                      key={reward.id}
                      title={reward.title}
                      description={reward.description}
                      pointsCost={reward.pointsCost}
                      imageUrl={reward.imageUrl}
                      isEcoFriendly={reward.isEcoFriendly}
                      onRedeem={() => handleRewardRedeem(reward.id)}
                      available={userData.points >= reward.pointsCost}
                    />
                  ))
                ) : (
                  <div className="col-span-3 py-8 text-center">
                    <p className="text-muted-foreground">No rewards found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Rewards;
