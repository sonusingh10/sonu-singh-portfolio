"use client";

import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/content/profile";

export function TroubleshootingToolkit({ groups }: { groups: Profile["toolGroups"] }) {
  const [expanded, setExpanded] = useState(true);
  const [burning, setBurning] = useState(false);
  const burnTimer = useRef<number | null>(null);
  const panelId = "troubleshooting-toolkit-content";

  useEffect(() => () => {
    if (burnTimer.current !== null) window.clearTimeout(burnTimer.current);
  }, []);

  const toggle = () => {
    if (burnTimer.current !== null) window.clearTimeout(burnTimer.current);
    const next = !expanded;
    setExpanded(next);
    setBurning(next);
    if (next) burnTimer.current = window.setTimeout(() => setBurning(false), 850);
  };

  return <div className="troubleshooting-tools">
    <div className="toolkit-heading">
      <span className="cert-label">TROUBLESHOOTING TOOLKIT</span>
      <span className="toolkit-heading-context">Practical tools, grouped by the question they help answer.
        <button className="section-collapse-toggle" type="button" aria-expanded={expanded} aria-controls={panelId} aria-label={`${expanded ? "Collapse" : "Expand"} troubleshooting toolkit`} title={`${expanded ? "Collapse" : "Expand"} troubleshooting toolkit`} data-interaction onClick={toggle}>
          <span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      </span>
    </div>
    <div className={`toolkit-collapse-panel${expanded ? "" : " is-collapsed"}${burning ? " is-burning" : ""}`} id={panelId} aria-hidden={!expanded} inert={!expanded}>
      <div className="toolkit-collapse-inner">
        <div className="toolgroup-list">
          {groups.map((group, index) => <section className="toolgroup" key={group.title}>
            <div className="toolgroup-static-heading"><span className="toolgroup-number">0{index + 1}</span><h3 className="toolgroup-title">{group.title}</h3><span className="toolgroup-count">{group.categories.length} areas</span></div>
            <div className="tool-category-list">{group.categories.map(category => <div className="tool-category" key={category.title}><h4>{category.title}</h4><p>{category.tools.join(" · ")}</p></div>)}</div>
          </section>)}
        </div>
      </div>
    </div>
  </div>;
}
