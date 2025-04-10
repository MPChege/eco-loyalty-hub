
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoyaltyCard } from "@/components/LoyaltyCard";
import { PointsProgress } from "@/components/PointsProgress";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Edit, Bell, Globe, ShieldCheck } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  
  // State to manage user data
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+255 123 456 789",
    memberId: "AMKA-27491",
    points: 750,
    tier: "Gold",
    nextTier: "Platinum",
    nextTierPoints: 1500,
    joinedDate: "January 15, 2025",
  });
  
  // Form states
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user data with form data
    setUserData(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }));
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };
  
  const handleUpdatePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your account information
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card className="overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mt-4">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
                <p className="text-sm text-muted-foreground mt-1">Member since {userData.joinedDate}</p>
                
                <div className="w-full mt-6">
                  <LoyaltyCard
                    businessType="amka"
                    customerName={userData.name}
                    membershipId={userData.memberId}
                    points={userData.points}
                    tier={userData.tier}
                  />
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Progress to {userData.nextTier}</p>
                    <PointsProgress
                      currentPoints={userData.points}
                      nextTierPoints={userData.nextTierPoints}
                      currentTier={userData.tier}
                      nextTier={userData.nextTier}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Tabs defaultValue="information">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="information">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="cards">Digital Cards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="information" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your account details and contact information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="name" 
                            className="pl-10" 
                            value={formData.name} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="email" 
                            type="email" 
                            className="pl-10" 
                            value={formData.email} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="phone" 
                            className="pl-10" 
                            value={formData.phone} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                        <Edit className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control how and when you receive updates and notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdatePreferences} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailNotif">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about your points and rewards via email
                          </p>
                        </div>
                        <Switch id="emailNotif" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="smsNotif">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get text messages about special offers and events
                          </p>
                        </div>
                        <Switch id="smsNotif" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketingNotif">Marketing Communications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional offers and newsletters
                          </p>
                        </div>
                        <Switch id="marketingNotif" />
                      </div>
                      
                      <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                        <Bell className="mr-2 h-4 w-4" />
                        Update Preferences
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control how your data is used and shared.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dataSharing">Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow sharing data between our partner establishments
                        </p>
                      </div>
                      <Switch id="dataSharing" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="locationTracking">Location Services</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable location-based rewards and offers
                        </p>
                      </div>
                      <Switch id="locationTracking" />
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Review Our Privacy Policy
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="cards" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Digital Cards</CardTitle>
                    <CardDescription>
                      Access your digital membership card for Amka Cafe.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      Simply show this digital card at Amka Cafe to earn and redeem points.
                      No plastic cards needed!
                    </p>
                    
                    <div className="space-y-4">
                      <LoyaltyCard
                        businessType="amka"
                        customerName={userData.name}
                        membershipId={userData.memberId}
                        points={userData.points}
                        tier={userData.tier}
                      />
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Globe className="mr-2 h-4 w-4" />
                      Add to Digital Wallet
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
