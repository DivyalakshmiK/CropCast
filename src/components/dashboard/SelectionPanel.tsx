import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { crops, markets, seasons, forecastHorizons } from "@/data/cropData";
import { Loader2, TrendingUp } from "lucide-react";

interface SelectionPanelProps {
  selectedCrop: string;
  selectedMarket: string;
  selectedSeason: string;
  selectedHorizon: string;
  onCropChange: (value: string) => void;
  onMarketChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
  onHorizonChange: (value: string) => void;
  onPredict: () => void;
  isLoading: boolean;
}

export function SelectionPanel({
  selectedCrop,
  selectedMarket,
  selectedSeason,
  selectedHorizon,
  onCropChange,
  onMarketChange,
  onSeasonChange,
  onHorizonChange,
  onPredict,
  isLoading,
}: SelectionPanelProps) {
  const isValid = selectedCrop && selectedMarket && selectedSeason && selectedHorizon;

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">
        Select Parameters
      </h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Crop Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            🌱 Crop
          </label>
          <Select value={selectedCrop} onValueChange={onCropChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop.id} value={crop.id}>
                  {crop.icon} {crop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Market Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            📍 Market / Region
          </label>
          <Select value={selectedMarket} onValueChange={onMarketChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select market" />
            </SelectTrigger>
            <SelectContent>
              {markets.map((market) => (
                <SelectItem key={market.id} value={market.id}>
                  {market.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Season Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            📅 Season
          </label>
          <Select value={selectedSeason} onValueChange={onSeasonChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((season) => (
                <SelectItem key={season.id} value={season.id}>
                  {season.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Forecast Horizon */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            ⏳ Forecast Horizon
          </label>
          <Select value={selectedHorizon} onValueChange={onHorizonChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select horizon" />
            </SelectTrigger>
            <SelectContent>
              {forecastHorizons.map((horizon) => (
                <SelectItem key={horizon.id} value={horizon.id}>
                  {horizon.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Predict Button */}
        <div className="flex items-end">
          <Button
            onClick={onPredict}
            disabled={!isValid || isLoading}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-4 w-4" />
                Predict
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}