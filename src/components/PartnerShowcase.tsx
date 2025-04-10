
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PartnerShowcaseProps {
  className?: string;
}

export function PartnerShowcase({ className }: PartnerShowcaseProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Partner data structure
  const partners = [
    {
      id: "amka",
      name: "Amka Cafe",
      logo: "/public/lovable-uploads/60f18ef5-192e-40be-ad39-c1b132612ec3.png",
      description: "Enjoy eco-friendly coffee and delicious sustainable meals with every visit.",
      images: [
        "/public/lovable-uploads/a24f8249-1ed0-401c-b6cf-2f76904aaef8.png",
        "/public/lovable-uploads/80a941e7-af39-46e6-8edb-b1d7385c9117.png",
        "/public/lovable-uploads/188843ee-2479-4fcb-b89d-27fa9b06ffb1.png",
        "/public/lovable-uploads/7a0f02d3-44ea-4d88-a7fe-03b630226248.png",
        "/public/lovable-uploads/9a433ae2-b4b0-49a9-bc2b-7435ee81b7b1.png",
        "/public/lovable-uploads/3f3324e6-7774-4c31-9561-bbdd3675da20.png"
      ]
    },
    {
      id: "mawimbi",
      name: "Mawimbi",
      logo: "https://images.unsplash.com/photo-1581541535394-aaa7bcd0a664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Experience beachside dining with our sustainable seafood and ocean-friendly practices.",
      images: []
    },
    {
      id: "kasa",
      name: "Kasa Resort",
      logo: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Luxury eco-resort with sustainable accommodations and organic dining options.",
      images: []
    }
  ];

  // Navigation functions for image carousel
  const nextImage = () => {
    const currentPartner = partners.find(p => p.id === "amka");
    if (currentPartner) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === currentPartner.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    const currentPartner = partners.find(p => p.id === "amka");
    if (currentPartner) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? currentPartner.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Our Partners</h2>
        
        <Tabs defaultValue="amka">
          <TabsList className="mb-6 flex flex-wrap">
            {partners.map(partner => (
              <TabsTrigger key={partner.id} value={partner.id}>{partner.name}</TabsTrigger>
            ))}
          </TabsList>
          
          {partners.map(partner => (
            <TabsContent key={partner.id} value={partner.id}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Partner info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-20 w-32">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{partner.name}</h3>
                      <p className="text-muted-foreground">{partner.description}</p>
                    </div>
                  </div>
                  
                  {/* Points accumulation info */}
                  <div className="mt-4 p-4 bg-accent/30 rounded-lg">
                    <p className="font-medium">Earn Points</p>
                    <p className="text-sm text-muted-foreground">5 points for every $10 spent at {partner.name}</p>
                  </div>
                </div>
                
                {/* Image showcase */}
                {partner.images.length > 0 && (
                  <div className="flex-1 relative">
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <img
                        src={partner.images[currentImageIndex]}
                        alt={`${partner.name} food`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Navigation arrows */}
                      <button 
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/60"
                        onClick={prevImage}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/60"
                        onClick={nextImage}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Pagination dots */}
                    <div className="flex justify-center gap-1 mt-2">
                      {partner.images.map((_, index) => (
                        <button
                          key={index}
                          className={`h-2 rounded-full transition-all ${
                            index === currentImageIndex ? "w-4 bg-primary" : "w-2 bg-muted"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
