import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  DollarSign, 
  Truck, 
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  Users
} from "lucide-react";

const MetricsCards = () => {
  const metrics = [
    {
      title: "Average Delivery Time",
      value: "23.4",
      unit: "min",
      change: -8.2,
      icon: Clock,
      color: "info"
    },
    {
      title: "Cost per Delivery",
      value: "$4.76",
      unit: "",
      change: -12.1,
      icon: DollarSign,
      color: "success"
    },
    {
      title: "Active Routes",
      value: "147",
      unit: "",
      change: 15.3,
      icon: Activity,
      color: "primary"
    },
    {
      title: "Fleet Utilization",
      value: "78.2",
      unit: "%",
      change: 5.4,
      icon: Truck,
      color: "warning"
    },
    {
      title: "EV Route Share",
      value: "43.1",
      unit: "%",
      change: 22.7,
      icon: Zap,
      color: "success"
    },
    {
      title: "Customer Satisfaction",
      value: "4.8",
      unit: "/5",
      change: 2.1,
      icon: Users,
      color: "primary"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return 'text-success border-success/20 bg-success/5';
      case 'warning':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'info':
        return 'text-info border-info/20 bg-info/5';
      case 'primary':
        return 'text-primary border-primary/20 bg-primary/5';
      default:
        return 'text-muted-foreground border-border bg-muted/5';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.change > 0;
        const isGoodChange = (metric.title.includes("Satisfaction") || 
                            metric.title.includes("Utilization") || 
                            metric.title.includes("EV") ||
                            metric.title.includes("Active")) ? isPositive : !isPositive;
        
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg border ${getColorClasses(metric.color)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <Badge 
                  variant="outline"
                  className={`text-xs ${
                    isGoodChange 
                      ? 'text-success border-success/20 bg-success/10' 
                      : 'text-destructive border-destructive/20 bg-destructive/10'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(metric.change)}%
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">
                  {metric.title}
                </p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-sm text-muted-foreground">
                      {metric.unit}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsCards;