import { TrendingDown, TrendingUp, Activity, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricsBoardProps {
  minPrice: number;
  maxPrice: number;
  volatility: "Low" | "Medium" | "High";
  confidence: number;
}

export function MetricsBoard({
  minPrice,
  maxPrice,
  volatility,
  confidence,
}: MetricsBoardProps) {
  const volatilityColor = {
    Low: "text-success bg-success/10",
    Medium: "text-warning bg-warning/10",
    High: "text-destructive bg-destructive/10",
  };

  const metrics = [
    {
      icon: TrendingDown,
      label: "Expected Min Price",
      value: `₹${minPrice.toLocaleString("en-IN")}`,
      sublabel: "per quintal",
      colorClass: "text-chart-historical",
    },
    {
      icon: TrendingUp,
      label: "Expected Max Price",
      value: `₹${maxPrice.toLocaleString("en-IN")}`,
      sublabel: "per quintal",
      colorClass: "text-chart-forecast",
    },
    {
      icon: Activity,
      label: "Price Volatility",
      value: volatility,
      sublabel: "Expected fluctuation",
      colorClass: volatilityColor[volatility],
      isBadge: true,
    },
    {
      icon: Brain,
      label: "Model Confidence",
      value: `${confidence}%`,
      sublabel: "Prediction accuracy",
      colorClass: "text-accent",
      showProgress: true,
      progress: confidence,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="border-border bg-card">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </span>
            </div>
            
            {metric.isBadge ? (
              <div
                className={`inline-block rounded-full px-3 py-1 text-lg font-bold ${metric.colorClass}`}
              >
                {metric.value}
              </div>
            ) : (
              <div className={`text-2xl font-bold ${metric.colorClass}`}>
                {metric.value}
              </div>
            )}
            
            {metric.showProgress && (
              <div className="mt-2">
                <Progress value={metric.progress} className="h-2" />
              </div>
            )}
            
            <p className="mt-1 text-xs text-muted-foreground">
              {metric.sublabel}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}