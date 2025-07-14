import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  CloudRain, 
  TrendingUp, 
  Zap, 
  Truck, 
  Plane,
  RotateCcw,
  Play,
  Settings2
} from "lucide-react";

const RouteControls = () => {
  const [demandSpike, setDemandSpike] = useState([100]);
  const [weatherSeverity, setWeatherSeverity] = useState([30]);
  const [carbonPriority, setCarbonPriority] = useState([75]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [enableDrones, setEnableDrones] = useState(true);
  const [enableEV, setEnableEV] = useState(true);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Optimization Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Settings2 className="h-5 w-5 text-primary" />
            <span>Route Optimization</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Demand Spike Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-warning" />
                <span>Demand Spike</span>
              </Label>
              <Badge variant="outline">{demandSpike[0]}%</Badge>
            </div>
            <Slider
              value={demandSpike}
              onValueChange={setDemandSpike}
              max={200}
              min={50}
              step={10}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Simulate order volume changes across the network
            </p>
          </div>

          {/* Weather Severity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center space-x-2">
                <CloudRain className="h-4 w-4 text-info" />
                <span>Weather Impact</span>
              </Label>
              <Badge variant="outline">{weatherSeverity[0]}%</Badge>
            </div>
            <Slider
              value={weatherSeverity}
              onValueChange={setWeatherSeverity}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Factor in weather disruptions and safety constraints
            </p>
          </div>

          {/* Carbon Priority */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center space-x-2">
                <span className="h-4 w-4 rounded-full bg-success flex items-center justify-center">
                  <span className="text-xs text-success-foreground">C</span>
                </span>
                <span>Carbon Priority</span>
              </Label>
              <Badge variant="outline" className="text-success border-success/20">
                {carbonPriority[0]}%
              </Badge>
            </div>
            <Slider
              value={carbonPriority}
              onValueChange={setCarbonPriority}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Weight carbon reduction vs speed/cost optimization
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Type Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Fleet Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="drones" className="flex items-center space-x-2">
              <Plane className="h-4 w-4 text-info" />
              <span>Drone Delivery</span>
            </Label>
            <Switch 
              id="drones" 
              checked={enableDrones} 
              onCheckedChange={setEnableDrones}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ev" className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-success" />
              <span>Electric Vehicles</span>
            </Label>
            <Switch 
              id="ev" 
              checked={enableEV} 
              onCheckedChange={setEnableEV}
            />
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Conventional trucks always available</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="w-full bg-gradient-to-r from-eco-primary to-eco-secondary hover:from-eco-secondary hover:to-eco-primary"
        >
          {isOptimizing ? (
            <>
              <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
              Optimizing Routes...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run Optimization
            </>
          )}
        </Button>
        
        <Button variant="outline" className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Baseline
        </Button>
      </div>

      {/* Current Scenario */}
      <Card className="bg-eco-light/50 border-eco-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Active Scenario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network Load:</span>
              <span className="font-medium">{demandSpike[0]}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weather Risk:</span>
              <span className="font-medium">{weatherSeverity[0]}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Carbon Focus:</span>
              <span className="font-medium text-success">{carbonPriority[0]}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteControls;