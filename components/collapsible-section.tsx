"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const sectionIds = ["about", "experience", "projects", "toolkit", "contact"] as const;
export type CollapsibleSectionId = typeof sectionIds[number];
type SectionExpansionContextValue = {
  expanded: Record<CollapsibleSectionId, boolean>;
  setSection: (id: CollapsibleSectionId, value: boolean) => void;
  allExpanded: boolean;
  toggleAll: () => void;
};
const SectionExpansionContext = createContext<SectionExpansionContextValue | null>(null);

export function CollapsibleSectionsProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState<Record<CollapsibleSectionId, boolean>>({ about: true, experience: true, projects: true, toolkit: true, contact: true });
  const allExpanded = sectionIds.every(id => expanded[id]);
  const setSection = useCallback((id: CollapsibleSectionId, isExpanded: boolean) => {
    setExpanded(current => current[id] === isExpanded ? current : { ...current, [id]: isExpanded });
  }, []);
  const toggleAll = useCallback(() => {
    setExpanded(current => {
      const shouldExpand = !sectionIds.every(id => current[id]);
      return Object.fromEntries(sectionIds.map(id => [id, shouldExpand])) as Record<CollapsibleSectionId, boolean>;
    });
  }, []);
  const value = useMemo<SectionExpansionContextValue>(() => ({ expanded, setSection, allExpanded, toggleAll }), [expanded, setSection, allExpanded, toggleAll]);

  return <SectionExpansionContext.Provider value={value}>{children}</SectionExpansionContext.Provider>;
}

export function useSectionExpansion() {
  const value = useContext(SectionExpansionContext);
  if (!value) throw new Error("Section controls must be inside CollapsibleSectionsProvider");
  return value;
}

type CollapsibleSectionProps = {
  id: CollapsibleSectionId;
  className: string;
  number: string;
  label: string;
  context: string;
  children: ReactNode;
};

export function CollapsibleSection({ id, className, number, label, context, children }: CollapsibleSectionProps) {
  const { expanded: expandedSections, setSection } = useSectionExpansion();
  const expanded = expandedSections[id];
  const [burning, setBurning] = useState(false);
  const burnTimer = useRef<number | null>(null);
  const wasExpanded = useRef(expanded);
  const panelId = `${id}-content`;

  useEffect(() => {
    const openLinkedSection = () => {
      if (window.location.hash === `#${id}`) setSection(id, true);
    };
    window.addEventListener("hashchange", openLinkedSection);
    openLinkedSection();
    return () => window.removeEventListener("hashchange", openLinkedSection);
  }, [id, setSection]);

  useEffect(() => () => {
    if (burnTimer.current !== null) window.clearTimeout(burnTimer.current);
  }, []);

  useEffect(() => {
    if (expanded && !wasExpanded.current) {
      setBurning(true);
      burnTimer.current = window.setTimeout(() => setBurning(false), 850);
    }
    wasExpanded.current = expanded;
  }, [expanded]);

  const toggle = () => {
    if (burnTimer.current !== null) window.clearTimeout(burnTimer.current);
    setSection(id, !expanded);
  };

  return <section className={`${className}${expanded ? "" : " is-collapsed"}`} id={id}>
    <div className="page-wrap">
      <div className="section-label">
        <span>{number} / {label}</span>
        <span className="section-label-context">{context}
          <button className="section-collapse-toggle" type="button" aria-expanded={expanded} aria-controls={panelId} aria-label={`${expanded ? "Collapse" : "Expand"} ${label.toLowerCase()} section`} title={`${expanded ? "Collapse" : "Expand"} ${label.toLowerCase()} section`} data-interaction onClick={toggle}>
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        </span>
      </div>
      <div className={`section-expand-panel${expanded ? "" : " is-collapsed"}${burning ? " is-burning" : ""}`} id={panelId} aria-hidden={!expanded} inert={!expanded}>
        <div className="section-expand-inner">{children}</div>
      </div>
    </div>
  </section>;
}
