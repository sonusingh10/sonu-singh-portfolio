import type { Metadata } from "next";
import { PrivateAnalyticsDashboard } from "@/components/analytics-ui";

export const metadata: Metadata = {
  title: "Private site activity",
  robots: { index: false, follow: false },
};

export default function InsightsPage() {
  return <PrivateAnalyticsDashboard />;
}
