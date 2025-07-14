import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-eco-primary to-eco-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EcoRoute AI</h1>
              <p className="text-sm text-muted-foreground">Carbon-Aware Logistics Platform</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-eco-accent text-eco-primary border-eco-primary/20">
            Dallas-Fort Worth Network
          </Badge>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-success border-success/20 bg-success/5">
            System Online
          </Badge>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-warning">3</Badge>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;