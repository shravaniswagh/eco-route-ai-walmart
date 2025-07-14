import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Plane, Zap } from "lucide-react";

// Fix Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

  const getRouteColor = (type: string) => {
    switch (type) {
      case 'drone': return '#3b82f6';
      case 'ev': return '#10b981';
      case 'truck': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <Card className="p-0 overflow-hidden bg-gradient-to-br from-eco-light to-background">
      <div className="relative h-[600px] bg-gradient-to-br from-muted/20 to-eco-accent/30">
        <MapContainer 
          center={[32.7767, -96.7970]} 
          zoom={11} 
          className="absolute inset-4 rounded-lg z-0"
          style={{ height: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {routes.flatMap((route) =>
            route.points.map((point) => (
              <Marker key={point.id} position={[point.lat, point.lng]}>
                <Popup>
                  <div className="text-center">
                    <h4 className="font-semibold">{point.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{point.type}</p>
                    <p className="text-xs">Status: <span className="capitalize">{point.status}</span></p>
                  </div>
                </Popup>
              </Marker>
            ))
          )}
          
          {routes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.points.map(p => [p.lat, p.lng] as [number, number])}
              color={getRouteColor(route.type)}
              weight={3}
              opacity={0.8}
              dashArray={route.status === 'optimizing' ? '10, 10' : undefined}
            />
          ))}
        </MapContainer>

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