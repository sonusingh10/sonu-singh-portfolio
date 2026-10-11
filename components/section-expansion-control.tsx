"use client";

import { useSectionExpansion } from "@/components/collapsible-section";

export function SectionExpansionControl() {
  const { allExpanded, toggleAll } = useSectionExpansion();
  const action = allExpanded ? "Collapse" : "Expand";

  return <button
    className="section-expansion-control"
    type="button"
    aria-label={`${action} all sections`}
    aria-pressed={allExpanded}
    title={`${action} all sections`}
    data-interaction
    onClick={toggleAll}
  >
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      {allExpanded
        ? <><path d="M6.5 7.5h7M6.5 10h7M6.5 12.5h7" /><path d="m8 5.5 2-1.5 2 1.5" /></>
        : <><path d="M6.5 7.5h7M6.5 10h7M6.5 12.5h7" /><path d="m8 14.5 2 1.5 2-1.5" /></>}
    </svg>
    <span className="utility-tooltip" role="tooltip">{action} all sections</span>
  </button>;
}
