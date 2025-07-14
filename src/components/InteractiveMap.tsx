import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Plane, MapPin, Zap } from "lucide-react";

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
        {/* Real Interactive Map */}
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
          
          {/* Route Markers and Lines */}
          {routes.map((route) => (
            route.points.map((point) => (
              <Marker 
                key={point.id} 
                position={[point.lat, point.lng]}
              >
                <Popup>
                  <div className="text-center">
                    <h4 className="font-semibold">{point.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">{point.type}</p>
                    <p className="text-xs">Status: <span className="capitalize">{point.status}</span></p>
                  </div>
                </Popup>
              </Marker>
            ))
          ))}
          
          {/* Route Lines */}
          {routes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.points.map(p => [p.lat, p.lng])}
              color={route.type === 'drone' ? '#3b82f6' : route.type === 'ev' ? '#10b981' : '#f59e0b'}
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