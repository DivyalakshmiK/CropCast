import { Button } from "@/components/ui/button";
import { Wheat, Info, Database, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wheat className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">CropCast</span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Info className="h-4 w-4" />
            About
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Database className="h-4 w-4" />
            Data Sources
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Target className="h-4 w-4" />
            Model Accuracy
          </a>
        </nav>

        {/* CTA */}
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Open Dashboard
        </Button>
      </div>
    </header>
  );
}