import { useState, useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SelectionPanel } from "@/components/dashboard/SelectionPanel";
import { PredictionCard } from "@/components/dashboard/PredictionCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { MetricsBoard } from "@/components/dashboard/MetricsBoard";
import {
  generateHistoricalData,
  generateForecastData,
  calculateMetrics,
  forecastHorizons,
} from "@/data/cropData";

const Dashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedHorizon, setSelectedHorizon] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<{
    historical: ReturnType<typeof generateHistoricalData>;
    forecast: ReturnType<typeof generateForecastData>;
    metrics: ReturnType<typeof calculateMetrics>;
  } | null>(null);

  const handlePredict = useCallback(() => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const horizonMonths =
        forecastHorizons.find((h) => h.id === selectedHorizon)?.months || 3;

      const historical = generateHistoricalData(selectedCrop, selectedMarket);
      const forecast = generateForecastData(
        selectedCrop,
        selectedMarket,
        horizonMonths
      );
      const metrics = calculateMetrics(forecast);

      setPredictionData({ historical, forecast, metrics });
      setIsLoading(false);
    }, 1500);
  }, [selectedCrop, selectedMarket, selectedHorizon]);

  const horizonLabel =
    forecastHorizons.find((h) => h.id === selectedHorizon)?.name || "";

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground lg:text-3xl">
            Price Forecasting Dashboard
          </h1>
          <p className="text-muted-foreground">
            Select crop parameters to generate accurate price predictions
          </p>
        </div>

        {/* Selection Panel */}
        <div className="mb-8">
          <SelectionPanel
            selectedCrop={selectedCrop}
            selectedMarket={selectedMarket}
            selectedSeason={selectedSeason}
            selectedHorizon={selectedHorizon}
            onCropChange={setSelectedCrop}
            onMarketChange={setSelectedMarket}
            onSeasonChange={setSelectedSeason}
            onHorizonChange={setSelectedHorizon}
            onPredict={handlePredict}
            isLoading={isLoading}
          />
        </div>

        {/* Results Section */}
        {predictionData && (
          <div className="animate-fade-in space-y-6">
            {/* Prediction Card & Chart */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <PredictionCard
                  cropId={selectedCrop}
                  avgPrice={predictionData.metrics.avgPrice}
                  priceChange={predictionData.metrics.priceChange}
                  horizonLabel={horizonLabel.split(" ")[0]}
                />
              </div>
              <div className="lg:col-span-2">
                <PriceChart
                  historicalData={predictionData.historical}
                  forecastData={predictionData.forecast}
                />
              </div>
            </div>

            {/* Metrics Board */}
            <MetricsBoard
              minPrice={predictionData.metrics.minPrice}
              maxPrice={predictionData.metrics.maxPrice}
              volatility={predictionData.metrics.volatility}
              confidence={predictionData.metrics.confidence}
            />

            {/* Disclaimer */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> These predictions are generated
                using machine learning models trained on historical APMC market
                data. Actual prices may vary due to unforeseen market
                conditions, weather events, policy changes, and other factors.
                Use this information for guidance purposes only.
              </p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!predictionData && !isLoading && (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border">
            <div className="text-center">
              <div className="mb-4 text-6xl">📊</div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No Prediction Yet
              </h3>
              <p className="text-muted-foreground">
                Select crop parameters above and click "Predict" to generate
                forecasts
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;