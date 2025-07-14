import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Plane, Zap, MapPin } from "lucide-react";

interface RoutePoint {
  id: string;
  type: 'store' | 'customer' | 'depot';
  lat: number;
  lng: number;
  name: string;
  status: 'active' | 'completed' | 'pending';
}

interface Route {
  id: string;
  type: 'drone' | 'truck' | 'ev';
  points: RoutePoint[];
  carbonSaved: number;
  status: 'active' | 'completed' | 'optimizing';
}

const InteractiveMap = () => {
  const [routes] = useState<Route[]>([
    {
      id: '1',
      type: 'drone',
      points: [
        { id: '1', type: 'depot', lat: 32.7767, lng: -96.7970, name: 'Dallas Hub', status: 'completed' },
        { id: '2', type: 'customer', lat: 32.7557, lng: -96.8080, name: 'Highland Park', status: 'active' },
      ],
      carbonSaved: 2.3,
      status: 'active'
    },
    {
      id: '2',
      type: 'ev',
      points: [
        { id: '3', type: 'store', lat: 32.8203, lng: -96.8719, name: 'Walmart Plano', status: 'completed' },
        { id: '4', type: 'customer', lat: 32.8355, lng: -96.8500, name: 'Frisco Delivery', status: 'pending' },
      ],
      carbonSaved: 4.7,
      status: 'optimizing'
    }
  ]);

  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  return (
    <Card className="p-0 overflow-hidden bg-gradient-to-br from-eco-light to-background">
      <div className="relative h-[600px] bg-gradient-to-br from-muted/20 to-eco-accent/30">
        
        {/* Temporary Map Placeholder - Working on Map Integration */}
        <div className="absolute inset-4 rounded-lg z-0 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-dashed border-primary/20">
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 text-primary mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-primary">Interactive Map Loading</h3>
                <p className="text-sm text-muted-foreground">Dallas-Fort Worth Area Route Visualization</p>
                <div className="mt-4 space-y-2">
                  {routes.map((route) => (
                    <div key={route.id} className="flex items-center justify-center space-x-2 text-sm">
                      {route.type === 'drone' ? <Plane className="h-4 w-4 text-blue-500" /> : 
                       route.type === 'ev' ? <Zap className="h-4 w-4 text-green-500" /> : 
                       <Truck className="h-4 w-4 text-orange-500" />}
                      <span>Route {route.id}: {route.points[0].name} → {route.points[1].name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
          <h3 className="font-semibold text-sm mb-3">Active Routes</h3>
          <div className="space-y-2">
            {routes.map((route) => (
              <div 
                key={route.id}
                className={`flex items-center justify-between p-2 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedRoute === route.id ? 'border-primary bg-primary/5' : 'border-border bg-card/50'
                }`}
                onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
              >
                <div className="flex items-center space-x-2">
                  {route.type === 'drone' ? <Plane className="h-4 w-4 text-blue-500" /> : 
                   route.type === 'ev' ? <Zap className="h-4 w-4 text-green-500" /> : 
                   <Truck className="h-4 w-4 text-orange-500" />}
                  <span className="text-sm font-medium">Route {route.id}</span>
                </div>
                <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                  -{route.carbonSaved}kg CO₂
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alert */}
        <div className="absolute bottom-4 left-4 bg-orange-100 text-orange-800 rounded-lg p-3 shadow-lg border border-orange-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Thunderstorm Alert: DFW Area</span>
          </div>
          <p className="text-xs mt-1">AI re-routing 4 drone deliveries to ground transport</p>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveMap;