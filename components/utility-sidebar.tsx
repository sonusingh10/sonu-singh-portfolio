"use client";

import { InteractionFeedback } from "@/components/interaction-feedback";
import { SectionExpansionControl } from "@/components/section-expansion-control";

export function UtilitySidebar() {
  return <aside className="utility-sidebar" aria-label="Quick controls">
    <SectionExpansionControl />
    <button className="theme-toggle" type="button" aria-label="Toggle color theme" aria-pressed="false" data-theme-toggle title="Switch between light and dark theme">
      <span className="theme-glyph" aria-hidden="true">◐</span>
      <span className="utility-tooltip" role="tooltip">Switch between light and dark theme</span>
    </button>
    <InteractionFeedback />
  </aside>;
}
