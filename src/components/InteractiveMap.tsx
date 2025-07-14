import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Plane, MapPin, Zap } from "lucide-react";

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
  const [routes, setRoutes] = useState<Route[]>([
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

  const getRouteColor = (type: string) => {
    switch (type) {
      case 'drone': return 'border-info bg-info/10';
      case 'ev': return 'border-success bg-success/10';
      case 'truck': return 'border-warning bg-warning/10';
      default: return 'border-muted bg-muted/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'completed': return 'bg-muted';
      case 'pending': return 'bg-warning';
      case 'optimizing': return 'bg-info animate-pulse';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="p-0 overflow-hidden bg-gradient-to-br from-eco-light to-background">
      <div className="relative h-[600px] bg-gradient-to-br from-muted/20 to-eco-accent/30">
        {/* Map Visualization */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50">
          <div className="absolute inset-4">
            {/* Simulated Map Grid */}
            <div className="grid grid-cols-12 grid-rows-8 gap-1 h-full opacity-10">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="bg-muted rounded-sm" />
              ))}
            </div>
            
            {/* Route Visualization */}
            {routes.map((route, index) => (
              <div key={route.id} className="absolute inset-0">
                {route.points.map((point, pointIndex) => (
                  <div
                    key={point.id}
                    className={`absolute w-4 h-4 rounded-full border-2 ${getStatusColor(point.status)} cursor-pointer transform -translate-x-2 -translate-y-2 transition-all hover:scale-125`}
                    style={{
                      left: `${((point.lng + 97) / 2) * 100}%`,
                      top: `${((33 - point.lat) / 1) * 100}%`
                    }}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-card px-2 py-1 rounded shadow-lg border opacity-0 hover:opacity-100 transition-opacity">
                      {point.name}
                    </div>
                  </div>
                ))}
                
                {/* Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d={`M ${((route.points[0]?.lng + 97) / 2) * 100}% ${((33 - route.points[0]?.lat) / 1) * 100}% L ${((route.points[1]?.lng + 97) / 2) * 100}% ${((33 - route.points[1]?.lat) / 1) * 100}%`}
                    stroke={route.type === 'drone' ? 'hsl(var(--info))' : route.type === 'ev' ? 'hsl(var(--success))' : 'hsl(var(--warning))'}
                    strokeWidth="3"
                    strokeDasharray={route.status === 'optimizing' ? '5,5' : '0'}
                    className={route.status === 'optimizing' ? 'animate-pulse' : ''}
                    fill="none"
                  />
                </svg>
              </div>
            ))}
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
                  selectedRoute === route.id ? 'border-primary bg-primary/5' : getRouteColor(route.type)
                }`}
                onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
              >
                <div className="flex items-center space-x-2">
                  {route.type === 'drone' ? <Plane className="h-4 w-4 text-info" /> : 
                   route.type === 'ev' ? <Zap className="h-4 w-4 text-success" /> : 
                   <Truck className="h-4 w-4 text-warning" />}
                  <span className="text-sm font-medium">Route {route.id}</span>
                </div>
                <Badge variant="outline" className="text-xs text-success border-success/20">
                  -{route.carbonSaved}kg CO₂
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alert */}
        <div className="absolute bottom-4 left-4 bg-warning/90 backdrop-blur-sm text-warning-foreground rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning-foreground rounded-full animate-pulse" />
            <span className="text-sm font-medium">Thunderstorm Alert: DFW Area</span>
          </div>
          <p className="text-xs mt-1">AI re-routing 4 drone deliveries to ground transport</p>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveMap;