
import React from "react";
import { Layout } from "@/components/Layout";
import { TransactionItem } from "@/components/TransactionItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { subDays } from "date-fns";

const History = () => {
  // This would come from API in a real application
  const transactions = [
    {
      id: 1,
      type: "purchase",
      businessType: "amka",
      date: new Date(),
      points: 50,
      description: "Breakfast order at Amka Cafe",
      amount: 25.50,
    },
    {
      id: 2,
      type: "redemption",
      businessType: "amka",
      date: subDays(new Date(), 2),
      points: 200,
      description: "Redeemed Free Coffee reward",
    },
    {
      id: 3,
      type: "purchase",
      businessType: "mawimbi",
      date: subDays(new Date(), 3),
      points: 120,
      description: "Dinner at Mawimbi Restaurant",
      amount: 60.00,
    },
    {
      id: 4,
      type: "purchase",
      businessType: "kasa",
      date: subDays(new Date(), 5),
      points: 300,
      description: "Two-night stay at Kasa Resort",
      amount: 300.00,
    },
    {
      id: 5,
      type: "redemption",
      businessType: "mawimbi",
      date: subDays(new Date(), 8),
      points: 500,
      description: "Redeemed Cooking Class reward",
    },
    {
      id: 6,
      type: "purchase",
      businessType: "amka",
      date: subDays(new Date(), 10),
      points: 40,
      description: "Coffee and pastry at Amka Cafe",
      amount: 18.75,
    },
  ];
  
  const pointsData = [
    { name: "Earned", value: 510, color: "#2E7D32" },
    { name: "Redeemed", value: 700, color: "#F9E79F" },
  ];
  
  const businessData = [
    { name: "Amka Cafe", value: 90, color: "#8B5A2B" },
    { name: "Mawimbi", value: 120, color: "#1A5276" },
    { name: "Kasa Resort", value: 300, color: "#7D6608" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground mt-1">
            View your recent activity and points history
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="w-full max-w-md">
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="earned">Points Earned</TabsTrigger>
                <TabsTrigger value="redeemed">Points Redeemed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="max-w-[180px]">
            <Select defaultValue="recent">
              <SelectTrigger>
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Points</SelectItem>
                <SelectItem value="lowest">Lowest Points</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="all">
              <TabsContent value="all" className="m-0">
                {transactions.map((transaction) => (
                  <TransactionItem 
                    key={transaction.id}
                    type={transaction.type as "purchase" | "redemption"}
                    businessType={transaction.businessType as "amka" | "mawimbi" | "kasa"}
                    date={transaction.date}
                    points={transaction.points}
                    description={transaction.description}
                    amount={transaction.amount}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="earned" className="m-0">
                {transactions
                  .filter(t => t.type === "purchase")
                  .map((transaction) => (
                    <TransactionItem 
                      key={transaction.id}
                      type={transaction.type as "purchase" | "redemption"}
                      businessType={transaction.businessType as "amka" | "mawimbi" | "kasa"}
                      date={transaction.date}
                      points={transaction.points}
                      description={transaction.description}
                      amount={transaction.amount}
                    />
                ))}
              </TabsContent>
              
              <TabsContent value="redeemed" className="m-0">
                {transactions
                  .filter(t => t.type === "redemption")
                  .map((transaction) => (
                    <TransactionItem 
                      key={transaction.id}
                      type={transaction.type as "purchase" | "redemption"}
                      businessType={transaction.businessType as "amka" | "mawimbi" | "kasa"}
                      date={transaction.date}
                      points={transaction.points}
                      description={transaction.description}
                      amount={transaction.amount}
                    />
                ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Points Summary</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pointsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pointsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Points by Business</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={businessData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {businessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
