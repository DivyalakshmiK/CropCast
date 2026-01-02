import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary-foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Official badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground">
            <Shield className="h-4 w-4" />
            <span>Government-Grade Agricultural Intelligence</span>
          </div>

          {/* Main headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Crop Price
            <span className="block text-accent">Forecasting System</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80 lg:text-xl">
            Data-driven price predictions for farmers, traders, and policymakers. 
            Powered by advanced machine learning models trained on APMC market data.
          </p>

          {/* Trust indicators */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>ML-Powered Predictions</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>APMC Market Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Trusted Analytics</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="group bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg font-semibold shadow-lg transition-all hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}