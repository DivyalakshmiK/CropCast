import { BarChart3, MapPin, Clock, TrendingUp, Database, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: BarChart3,
    title: "Accurate Forecasting",
    description:
      "Advanced ML models trained on years of historical price data to predict future commodity prices with high accuracy.",
  },
  {
    icon: MapPin,
    title: "Regional Coverage",
    description:
      "Market-wise predictions covering major APMC mandis across India including Delhi, Mumbai, Chennai, and more.",
  },
  {
    icon: Clock,
    title: "Multiple Timeframes",
    description:
      "Short-term (1-3 months) and long-term (6-12 months) forecasts to support different planning horizons.",
  },
  {
    icon: TrendingUp,
    title: "Price Trends",
    description:
      "Interactive visualizations showing historical trends alongside predicted prices for informed decision-making.",
  },
  {
    icon: Database,
    title: "Comprehensive Data",
    description:
      "Coverage of essential commodities including vegetables, grains, and pulses across multiple seasons.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Insights",
    description:
      "Confidence scores and volatility indicators help you understand the reliability of each prediction.",
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Comprehensive Price Intelligence
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to make informed decisions about agricultural commodity pricing.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group border-border/60 bg-card transition-all hover:border-accent/30 hover:shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}