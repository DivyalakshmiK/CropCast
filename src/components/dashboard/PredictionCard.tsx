import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { crops } from "@/data/cropData";

interface PredictionCardProps {
  cropId: string;
  avgPrice: number;
  priceChange: number;
  horizonLabel: string;
}

export function PredictionCard({
  cropId,
  avgPrice,
  priceChange,
  horizonLabel,
}: PredictionCardProps) {
  const crop = crops.find((c) => c.id === cropId);
  const isPositive = priceChange >= 0;
  const pricePerKg = Math.round(avgPrice / 100);

  return (
    <div className="flex flex-col gap-7">
      <Card className="border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5 mt-2">
        <CardContent className="p-6 text-center">
          <div className="mb-2 text-sm font-medium text-muted-foreground">
            Predicted Average Price ({horizonLabel})
          </div>
          
          <div className="mb-1 text-sm text-muted-foreground">
            {crop?.icon} {crop?.name}
          </div>
          
          <div className="mb-3 text-4xl font-bold text-foreground lg:text-5xl">
            ₹{avgPrice.toLocaleString("en-IN")}
            <span className="ml-1 text-lg font-normal text-muted-foreground">
              / quintal
            </span>
          </div>
          
          <div
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
              isPositive
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {isPositive ? "+" : ""}
            {priceChange}%
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5">
        <CardContent className="p-6 text-center">
          <div className="mb-2 text-sm font-medium text-muted-foreground">
            Predicted Average Price ({horizonLabel})
          </div>
          
          <div className="mb-1 text-sm text-muted-foreground">
            {crop?.icon} {crop?.name}
          </div>
          
          <div className="mb-3 text-4xl font-bold text-foreground lg:text-5xl">
            ₹{pricePerKg.toLocaleString("en-IN")}
            <span className="ml-1 text-lg font-normal text-muted-foreground">
              / kg
            </span>
          </div>
          
          <div
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
              isPositive
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {isPositive ? "+" : ""}
            {priceChange}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}