// Static demo data for CropCast

export const crops = [
  { id: "tomato", name: "Tomato", icon: "🍅" },
  { id: "onion", name: "Onion", icon: "🧅" },
  { id: "potato", name: "Potato", icon: "🥔" },
  { id: "rice", name: "Rice", icon: "🌾" },
  { id: "wheat", name: "Wheat", icon: "🌿" },
  { id: "pulses", name: "Pulses (Tur Dal)", icon: "🫘" },
];

export const markets = [
  { id: "delhi", name: "Delhi (Azadpur)" },
  { id: "mumbai", name: "Mumbai (Vashi)" },
  { id: "chennai", name: "Chennai (Koyambedu)" },
  { id: "kolkata", name: "Kolkata (Koley Market)" },
  { id: "bangalore", name: "Bengaluru (Yeshwanthpur)" },
  { id: "hyderabad", name: "Hyderabad (Bowenpally)" },
];

export const seasons = [
  { id: "kharif", name: "Kharif (Monsoon)" },
  { id: "rabi", name: "Rabi (Winter)" },
  { id: "summer", name: "Summer (Zaid)" },
];

export const forecastHorizons = [
  { id: "short", name: "Short-term (1-3 months)", months: 3 },
  { id: "long", name: "Long-term (6-12 months)", months: 12 },
];

// Generate historical price data (last 12 months)
export const generateHistoricalData = (cropId: string, marketId: string) => {
  const basePrice = getBasePrice(cropId);
  const volatility = getVolatility(cropId);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const currentMonth = new Date().getMonth();
  const data = [];
  
  for (let i = 11; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const seasonalFactor = getSeasonalFactor(monthIndex, cropId);
    const randomVariation = (Math.random() - 0.5) * volatility * basePrice;
    const price = Math.round(basePrice * seasonalFactor + randomVariation);
    
    data.push({
      month: months[monthIndex],
      year: i > currentMonth ? 2024 : 2025,
      price,
      type: "historical" as const,
    });
  }
  
  return data;
};

// Generate forecast data
export const generateForecastData = (
  cropId: string,
  marketId: string,
  horizonMonths: number
) => {
  const basePrice = getBasePrice(cropId);
  const volatility = getVolatility(cropId);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const currentMonth = new Date().getMonth();
  const data = [];
  let lastPrice = basePrice;
  
  for (let i = 1; i <= horizonMonths; i++) {
    const monthIndex = (currentMonth + i) % 12;
    const seasonalFactor = getSeasonalFactor(monthIndex, cropId);
    const trend = 1 + (Math.random() - 0.4) * 0.05; // Slight upward trend
    const randomVariation = (Math.random() - 0.5) * volatility * basePrice * 0.5;
    lastPrice = Math.round(lastPrice * seasonalFactor * trend + randomVariation);
    
    data.push({
      month: months[monthIndex],
      year: currentMonth + i > 11 ? 2026 : 2025,
      price: lastPrice,
      type: "forecast" as const,
    });
  }
  
  return data;
};

// Calculate prediction metrics
export const calculateMetrics = (forecastData: { price: number }[]) => {
  const prices = forecastData.map(d => d.price);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const volatility = ((maxPrice - minPrice) / avgPrice) * 100;
  
  let volatilityLevel: "Low" | "Medium" | "High";
  if (volatility < 10) volatilityLevel = "Low";
  else if (volatility < 20) volatilityLevel = "Medium";
  else volatilityLevel = "High";
  
  // Simulated confidence based on data quality
  const confidence = Math.round(75 + Math.random() * 20);
  
  return {
    avgPrice,
    minPrice,
    maxPrice,
    volatility: volatilityLevel,
    confidence,
    priceChange: Math.round(((avgPrice - prices[0]) / prices[0]) * 100 * 10) / 10,
  };
};

// Helper functions
function getBasePrice(cropId: string): number {
  const basePrices: Record<string, number> = {
    tomato: 2500,
    onion: 2800,
    potato: 1800,
    rice: 3200,
    wheat: 2400,
    pulses: 8500,
  };
  return basePrices[cropId] || 2500;
}

function getVolatility(cropId: string): number {
  const volatilities: Record<string, number> = {
    tomato: 0.35,
    onion: 0.40,
    potato: 0.20,
    rice: 0.10,
    wheat: 0.10,
    pulses: 0.15,
  };
  return volatilities[cropId] || 0.20;
}

function getSeasonalFactor(month: number, cropId: string): number {
  // Simplified seasonal patterns
  const summerPeak = [4, 5, 6].includes(month) ? 1.15 : 1;
  const winterDip = [11, 0, 1].includes(month) ? 0.90 : 1;
  const monsoonEffect = [7, 8, 9].includes(month) ? 1.10 : 1;
  
  return summerPeak * winterDip * monsoonEffect;
}