import { Wheat, Info, Database, Target, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary text-primary-foreground">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-foreground/10">
            <Wheat className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold">CropCast</span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Home className="mr-1.5 h-4 w-4" />
            Home
          </Button>
          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <Info className="h-4 w-4" />
            Info
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <Database className="h-4 w-4" />
            Data Sources
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          >
            <Target className="h-4 w-4" />
            Model Accuracy
          </a>
        </nav>
      </div>
    </header>
  );
}