import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Plane, Zap } from "lucide-react";

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

  // Create map URL with markers for OpenStreetMap
  const createMapUrl = () => {
    const centerLat = 32.7767;
    const centerLng = -96.7970;
    const zoom = 11;
    
    // Create markers parameter for the routes
    let markers = '';
    routes.forEach(route => {
      route.points.forEach(point => {
        const color = route.type === 'drone' ? 'blue' : route.type === 'ev' ? 'green' : 'orange';
        markers += `&marker=${point.lat},${point.lng},${color}`;
      });
    });
    
    return `https://www.openstreetmap.org/export/embed.html?bbox=${centerLng-0.1},${centerLat-0.1},${centerLng+0.1},${centerLat+0.1}&layer=mapnik&marker=${centerLat},${centerLng}${markers}`;
  };

  return (
    <Card className="p-0 overflow-hidden bg-gradient-to-br from-eco-light to-background">
      <div className="relative h-[600px] bg-gradient-to-br from-muted/20 to-eco-accent/30">
        
        {/* Real OpenStreetMap */}
        <div className="absolute inset-4 rounded-lg overflow-hidden border-2 border-primary/20">
          <iframe
            src={createMapUrl()}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            scrolling="no"
            title="Dallas Area Route Map"
          />
          
          {/* Route Overlays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {routes.map((route) => {
              if (route.points.length < 2) return null;
              
              // Convert lat/lng to SVG coordinates (approximate)
              const startX = ((route.points[0].lng + 96.9) / 0.2) * 100;
              const startY = ((32.9 - route.points[0].lat) / 0.2) * 100;
              const endX = ((route.points[1].lng + 96.9) / 0.2) * 100;
              const endY = ((32.9 - route.points[1].lat) / 0.2) * 100;
              
              const color = route.type === 'drone' ? '#3b82f6' : route.type === 'ev' ? '#10b981' : '#f59e0b';
              
              return (
                <g key={route.id}>
                  <line
                    x1={`${startX}%`}
                    y1={`${startY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke={color}
                    strokeWidth="3"
                    strokeDasharray={route.status === 'optimizing' ? '10,5' : '0'}
                    opacity="0.8"
                  />
                  {/* Route markers */}
                  <circle
                    cx={`${startX}%`}
                    cy={`${startY}%`}
                    r="6"
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle
                    cx={`${endX}%`}
                    cy={`${endY}%`}
                    r="6"
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
          </svg>
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
          
          {/* Route Details */}
          <div className="mt-4 pt-3 border-t text-xs space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span>Drone Routes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span>Electric Vehicle</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-orange-500 opacity-50" style={{strokeDasharray: '2,2'}}></div>
              <span>Optimizing</span>
            </div>
          </div>
        </div>

        {/* Route Information Panel */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border max-w-sm">
          <h4 className="font-semibold text-sm mb-2">Current Routes</h4>
          <div className="space-y-2 text-xs">
            {routes.map((route) => (
              <div key={route.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {route.type === 'drone' ? <Plane className="h-3 w-3 text-blue-500" /> : 
                   route.type === 'ev' ? <Zap className="h-3 w-3 text-green-500" /> : 
                   <Truck className="h-3 w-3 text-orange-500" />}
                  <span>{route.points[0].name} → {route.points[1].name}</span>
                </div>
                <span className="text-green-600 font-medium">-{route.carbonSaved}kg</span>
              </div>
            ))}
          </div>
          
          {/* Weather Alert */}
          <div className="mt-3 pt-2 border-t">
            <div className="flex items-center space-x-2 text-orange-600">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium">Storm Alert: Rerouting drones</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveMap;