"use client";

import { useEffect } from "react";

const trackingEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

export function AnalyticsTracker() {
  useEffect(() => {
    if (!trackingEnabled) return;

    const track = (event: "page_view" | "resume_download") => {
      const payload = new Blob([JSON.stringify({ event })], { type: "application/json" });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", payload);
      } else {
        void fetch("/api/track", { method: "POST", body: payload, keepalive: true, credentials: "same-origin" }).catch(() => {});
      }
    };

    if (window.location.pathname !== "/insights" && !window.location.pathname.startsWith("/api/")) track("page_view");
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[download][href="/resume.pdf"]');
      if (link) track("resume_download");
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
