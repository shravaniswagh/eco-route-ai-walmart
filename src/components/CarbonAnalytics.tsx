import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  TrendingDown, 
  Target, 
  Award,
  BarChart3,
  Activity
} from "lucide-react";

const CarbonAnalytics = () => {
  const carbonMetrics = {
    savedToday: 847.3,
    targetDaily: 1200,
    thisWeek: 5234.7,
    lastWeek: 4891.2,
    monthlyTarget: 25000,
    monthlyProgress: 18750
  };

  const improvementPercent = ((carbonMetrics.thisWeek - carbonMetrics.lastWeek) / carbonMetrics.lastWeek * 100);
  const dailyProgress = (carbonMetrics.savedToday / carbonMetrics.targetDaily) * 100;
  const monthlyProgress = (carbonMetrics.monthlyProgress / carbonMetrics.monthlyTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Daily Carbon Savings */}
      <Card className="bg-gradient-to-br from-success/5 to-eco-light/50 border-success/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-success" />
              <span>Today's Carbon Savings</span>
            </div>
            <Badge className="bg-success text-success-foreground">
              {dailyProgress.toFixed(0)}% of target
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-bold text-success">
                  {carbonMetrics.savedToday.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  kg CO₂e saved
                </span>
              </div>
              <Progress value={dailyProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Target: {carbonMetrics.targetDaily.toLocaleString()} kg CO₂e daily
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Comparison */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-info" />
            <span>Weekly Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">{carbonMetrics.thisWeek.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">kg CO₂e saved</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-success border-success/20 mb-2">
                  +{improvementPercent.toFixed(1)}%
                </Badge>
                <p className="text-sm text-muted-foreground">vs last week</p>
                <p className="text-lg font-semibold text-muted-foreground">
                  {carbonMetrics.lastWeek.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-warning" />
            <span>Monthly Target</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold">
                  {carbonMetrics.monthlyProgress.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {carbonMetrics.monthlyTarget.toLocaleString()} kg CO₂e
                </span>
              </div>
              <Progress value={monthlyProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {monthlyProgress.toFixed(1)}% complete • {(carbonMetrics.monthlyTarget - carbonMetrics.monthlyProgress).toLocaleString()} kg remaining
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Route Type Impact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-info rounded-full"></div>
                  <span className="text-sm">Drone Routes</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">342.1 kg</p>
                  <p className="text-xs text-muted-foreground">40% of savings</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-success rounded-full"></div>
                  <span className="text-sm">Electric Vehicles</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">423.7 kg</p>
                  <p className="text-xs text-muted-foreground">50% of savings</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-warning rounded-full"></div>
                  <span className="text-sm">Route Optimization</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">81.5 kg</p>
                  <p className="text-xs text-muted-foreground">10% of savings</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badge */}
      <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8 text-warning" />
            <div>
              <p className="font-semibold text-warning">Sustainability Champion</p>
              <p className="text-sm text-muted-foreground">Exceeded weekly carbon targets for 3 consecutive weeks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonAnalytics;