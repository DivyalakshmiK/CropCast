import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPoint {
  month: string;
  year: number;
  price: number;
  type: "historical" | "forecast";
}

interface PriceChartProps {
  historicalData: DataPoint[];
  forecastData: DataPoint[];
}

export function PriceChart({ historicalData, forecastData }: PriceChartProps) {
  // Combine data for chart, with null values for gaps
  const combinedData = [
    ...historicalData.map((d) => ({
      name: `${d.month} '${String(d.year).slice(-2)}`,
      historical: d.price,
      forecast: null as number | null,
    })),
    // Add overlap point for smooth transition
    {
      name: `${historicalData[historicalData.length - 1]?.month || ""} '${String(
        historicalData[historicalData.length - 1]?.year || ""
      ).slice(-2)}`,
      historical: historicalData[historicalData.length - 1]?.price || null,
      forecast: historicalData[historicalData.length - 1]?.price || null,
    },
    ...forecastData.map((d) => ({
      name: `${d.month} '${String(d.year).slice(-2)}`,
      historical: null as number | null,
      forecast: d.price,
    })),
  ];

  // Remove duplicate overlap point
  const chartData = combinedData.filter(
    (item, index, arr) =>
      index === 0 || item.name !== arr[index - 1].name || item.forecast !== null
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const isHistorical = data.dataKey === "historical";
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="mb-1 text-sm font-medium text-card-foreground">{label}</p>
          <p className={`text-sm ${isHistorical ? "text-chart-historical" : "text-chart-forecast"}`}>
            {isHistorical ? "Historical" : "Predicted"}: ₹{data.value?.toLocaleString("en-IN")} / quintal
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Price Trend Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--chart-grid))"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">
                    {value === "historical" ? "Historical Prices" : "Forecasted Prices"}
                  </span>
                )}
              />
              {/* Historical line - dashed */}
              <Line
                type="monotone"
                dataKey="historical"
                stroke="hsl(var(--chart-historical))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--chart-historical))", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, stroke: "hsl(var(--chart-historical))", strokeWidth: 2 }}
                connectNulls={false}
              />
              {/* Forecast line - solid */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="hsl(var(--chart-forecast))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-forecast))", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-forecast))", strokeWidth: 2 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}