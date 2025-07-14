import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map, 
  BarChart3, 
  Settings, 
  Activity,
  Maximize2,
  RefreshCw
} from "lucide-react";

import Header from "@/components/Header";
import InteractiveMap from "@/components/InteractiveMap";
import RouteControls from "@/components/RouteControls";
import CarbonAnalytics from "@/components/CarbonAnalytics";
import MetricsCards from "@/components/MetricsCards";
import dashboardHero from "@/assets/dashboard-hero.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-light/20 to-background">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url(${dashboardHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <Header />
      
      <main className="relative z-10 p-6">
        {/* Dashboard Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-foreground">
              Supply Chain Control Tower
            </h2>
            <Badge className="bg-eco-primary text-eco-primary bg-opacity-10 text-eco-primary">
              Live Data
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="h-4 w-4 mr-2" />
              {isFullscreen ? 'Exit' : 'Fullscreen'}
            </Button>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex items-center space-x-2">
              <Map className="h-4 w-4" />
              <span>Route Planning</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Carbon Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Configuration</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <MetricsCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <InteractiveMap />
              </div>
              <div>
                <CarbonAnalytics />
              </div>
            </div>
          </TabsContent>

          {/* Route Planning Tab */}
          <TabsContent value="routes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <InteractiveMap />
              </div>
              <div>
                <RouteControls />
              </div>
            </div>
          </TabsContent>

          {/* Carbon Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CarbonAnalytics />
              <div className="space-y-6">
                <MetricsCards />
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RouteControls />
              <div className="space-y-6">
                <div className="bg-card rounded-lg p-6 border">
                  <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>• AI models updated nightly with route performance data</p>
                    <p>• Weather integration via NOAA feeds (15-min refresh)</p>
                    <p>• Walmart ESG carbon factors: Scope 1 & 2 emissions</p>
                    <p>• Real-time traffic integration with 5-min updates</p>
                    <p>• Drone capacity limited to 5 lbs, 15-mile radius</p>
                    <p>• EV fleet range: 200 miles average per charge cycle</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
