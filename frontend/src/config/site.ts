/** Site-wide configuration constants */
export const siteConfig = {
  name: "GridForecast",
  description:
    "National Electricity Demand Forecasting — AI-powered energy analytics and predictive insights for smarter grid management.",
  url: "https://gridforecast.id",
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000",
    endpoints: {
      predict: "/api/predict",
    },
  },
  nav: [
    { label: "Overview", href: "/" },
    { label: "Forecast", href: "/forecast" },
    { label: "Analytics", href: "/analytics" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
