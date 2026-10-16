import { profile } from "@/content/profile";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";
import { PublicStats } from "@/components/analytics-ui";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { BlurTextWrapper } from "@/components/react-bits/blur-text-wrapper";
import { MagnetAction } from "@/components/react-bits/magnet-action";
import { TroubleshootingToolkit } from "@/components/troubleshooting-toolkit";
import { CollapsibleSection, CollapsibleSectionsProvider } from "@/components/collapsible-section";
import { UtilitySidebar } from "@/components/utility-sidebar";
import { HeroMindCanvas } from "@/components/hero-mind-canvas";
import { ForceParticleOverlay } from "@/components/force-particle-overlay";

const personJsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: profile.name,
  jobTitle: "Technical Account Manager", description: profile.seo.description,
  email: `mailto:${profile.email}`, address: { "@type": "PostalAddress", addressLocality: "Kraków", addressCountry: "PL" },
  url: profile.seo.siteUrl,
  sameAs: [profile.socialLinks.linkedin, profile.socialLinks.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.institution },
  knowsAbout: [
    ...profile.skills.flatMap(group => group.items),
    ...profile.toolGroups.flatMap(group => group.categories.flatMap(category => category.tools)),
  ],
};

type NetworkNodeKind = "client" | "resolve" | "secure" | "origin" | "browser";

function NetworkNode({ kind, label, detail }: { kind: NetworkNodeKind; label: string; detail: string }) {
  return <div className={`network-node network-node-${kind}`}>
    <span className="network-node-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {kind === "client" && <><rect x="3" y="4" width="18" height="13" rx="1.5" /><path d="M8 21h8m-4-4v4M6 8h12" /></>}
        {kind === "resolve" && <><circle cx="10.8" cy="10.8" r="6.4" /><path d="m16 16 4 4M8 10.8h5.6M10.8 8v5.6" /></>}
        {kind === "secure" && <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2" /></>}
        {kind === "origin" && <><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01M10 7h7m-7 10h7" /></>}
        {kind === "browser" && <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18M7 6h.01M10 6h.01m-3 6 2 2 4-4" /></>}
      </svg>
    </span>
    <span className="network-node-name">{label}</span>
    <span className="network-node-detail">{detail}</span>
  </div>;
}

export default function Home() {
  return <CollapsibleSectionsProvider><>
    <a href="#main" className="skip-link">Skip to content</a>
    <UtilitySidebar />
    <ForceParticleOverlay />
    <SiteHeader />
    <main id="main">
      <section className="hero page-wrap" aria-labelledby="hero-title">
        <HeroMindCanvas />
        <div className="hero-copy">
          <h1 id="hero-title">Make the complex<br /><em>make sense.</em></h1>
          <div className="hero-intro"><p>{profile.headline}</p><span className="hero-index">01 <i /> 05</span></div>
          <div className="hero-actions"><MagnetAction href="#contact"><span>Contact me</span><span aria-hidden="true">↗</span></MagnetAction><a className="text-link" href="/resume.pdf" download data-interaction>Download résumé <span aria-hidden="true">↓</span></a></div>
          <div className="hero-role"><span>FOCUS</span><span>{profile.role}</span></div>
        </div>
        <div className="hero-art" role="img" aria-label="Request flow: DHCP gives the laptop an IP address, the browser requests www.example.com, ARP and DNS resolve the next hop and server address, TCP and TLS secure the connection, a proxy or load balancer routes it to cache or core services, and the response returns to the browser for DOM rendering.">
          <div className="network-art-header"><span><i /> A REQUEST, END TO END</span><span>FROM URL TO RENDER</span></div>
          <div className="network-flow">
            <NetworkNode kind="client" label="CLIENT" detail="DHCP → IP · URL" />
            <span className="network-connector" />
            <NetworkNode kind="resolve" label="RESOLVE" detail="ARP · DNS → IP" />
            <span className="network-connector" />
            <NetworkNode kind="secure" label="SECURE" detail="TCP · TLS · ENCRYPTED" />
            <span className="network-connector" />
            <NetworkNode kind="origin" label="ORIGIN" detail="PROXY · LB / REDIS · CORE" />
            <span className="network-connector" />
            <NetworkNode kind="browser" label="BROWSER" detail="RESPONSE · DOM RENDER" />
            <i className="network-packet packet-request" aria-hidden="true" />
            <i className="network-packet packet-response" aria-hidden="true" />
          </div>
          <div className="network-art-directions"><span>REQUEST <i aria-hidden="true">→</i></span><span><i aria-hidden="true">←</i> RESPONSE</span></div>
          <div className="network-art-footer"><span>NAME → ROUTE → SERVICE → PAGE</span><span>TRACE THE EXPERIENCE <i aria-hidden="true">↗</i></span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Areas of expertise"><div className="ticker-inner"><span>OBSERVABILITY</span><i>✳</i><span>NETWORK SECURITY</span><i>✳</i><span>TECHNICAL SUCCESS</span><i>✳</i><span>PERFORMANCE</span></div></section>

      <CollapsibleSection className="section about-section" id="about" number="01" label="ABOUT" context="THE THROUGH LINE">
        <div className="about-grid"><h2>Technical depth.<br /><em>Human clarity.</em></h2><div className="about-copy">{profile.about.map((paragraph, i) => <p key={i}>{paragraph}</p>)}<div className="principles">{profile.principles.map(item => <span key={item}>{item}</span>)}</div><div className="motion-support"><BlurTextWrapper text="Trace the signal. Find the layer. Share what matters." /></div></div></div>
      </CollapsibleSection>

      <CollapsibleSection className="section experience-section" id="experience" number="02" label="EXPERIENCE" context="FIELD NOTES FROM THE WORK">
        <h2 className="section-heading">Make progress <em>visible.</em></h2>
        <div className="experience-list">{profile.experience.map((job, i) => <article className="experience-item" key={job.company}><div className="experience-meta"><span className="experience-number">0{i + 1}</span><span>{job.dates}</span></div><div className="experience-main"><div className="job-heading"><h3>{job.role}</h3><p>{job.company} <span>·</span> {job.location}</p></div><p className="job-summary">{job.summary}</p><ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div>
      </CollapsibleSection>

      <CollapsibleSection className="section projects-section" id="projects" number="03" label="SELECTED PROJECT" context="BUILT WITH CURIOSITY"><div className="project-header"><h2 className="section-heading">A place to learn<br /><em>by layers.</em></h2><span className="project-count">01 / 01</span></div>
        {profile.projects.map(project => <SpotlightCard key={project.name} className="project-card"><div className="project-image-wrap"><img className="project-image" src={project.image} alt={project.imageAlt} width={1440} height={1000} loading="lazy" /><a className="image-stamp" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name} website (opens in a new tab)`} data-interaction>LIVE PROJECT <i aria-hidden="true">↗</i></a></div><div className="project-copy"><p className="eyebrow project-eyebrow">{project.label} <span>/</span> {project.role}</p><h3>{project.name}</h3><p className="project-lede">{project.outcome}</p><div className="project-story"><div><span>THE QUESTION</span><p>{project.problem}</p></div><div><span>THE APPROACH</span><p>{project.approach}</p></div></div><a className="project-link" href={project.url} target="_blank" rel="noreferrer" data-interaction>Explore 7LayerX <span aria-hidden="true">↗</span></a></div></SpotlightCard>)}
      </CollapsibleSection>

      <CollapsibleSection className="section skills-section" id="toolkit" number="04" label="TOOLKIT" context="DEPTH BUILT IN PRACTICE"><h2 className="section-heading">Know the path.<br /><em>Know the tools.</em></h2><div className="skills-grid">{profile.skills.map(group => <article className="skill-group" key={group.number}><span className="skill-number">{group.number}</span><h3>{group.title}</h3><p>{group.refrain}</p><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div><TroubleshootingToolkit groups={profile.toolGroups} /><div className="certifications"><span className="cert-label">CERTIFICATIONS</span><ul className="credential-list">{profile.certifications.map(credential => <li key={credential.name}>{credential.url ? <a href={credential.url} target="_blank" rel="noreferrer">{credential.name}<span aria-hidden="true">↗</span></a> : <span>{credential.name}{credential.issuerUrl && <a className="credential-issuer" href={credential.issuerUrl} target="_blank" rel="noreferrer">Cisco ↗</a>}</span>}</li>)}</ul></div><div className="certifications recognition"><span className="cert-label">RECOGNITION</span><ul className="credential-list">{profile.recognition.map(item => <li key={item.name}><a href={item.url} target="_blank" rel="noreferrer">{item.name}<span aria-hidden="true">↗</span></a></li>)}</ul></div><div className="education"><span className="cert-label">EDUCATION</span><p><strong>{profile.education.degree}</strong>, {profile.education.field}<br />{profile.education.institution} <span>·</span> {profile.education.dates}</p></div></CollapsibleSection>

      <CollapsibleSection className="contact-section" id="contact" number="05" label="CONTACT" context="START A CONVERSATION"><div className="contact-grid"><div className="contact-copy"><p className="contact-kicker">Good work starts with a clear signal.</p><h2>What are you<br /><em>working on?</em></h2><p className="contact-note">{profile.contactNote}</p><a className="email-link" href={`mailto:${profile.email}`} data-interaction>{profile.email}<span aria-hidden="true">↗</span></a><div className="social-links">
        <a href={profile.socialLinks.website} target="_blank" rel="noreferrer" data-interaction aria-label="Visit 7LayerX website (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg><span>7LayerX</span><span aria-hidden="true">↗</span></a>
        <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" data-interaction aria-label="Visit LinkedIn profile (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v10M5 5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 9v10"/><circle cx="5" cy="5" r="1.5"/></svg><span>LinkedIn</span><span aria-hidden="true">↗</span></a>
        <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" data-interaction aria-label="Visit GitHub profile (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.6 1.2 15 3.1a13 13 0 0 0-7 0C5.4 1.2 3.2 1.5 3.2 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 7 18v4"/></svg><span>GitHub</span><span aria-hidden="true">↗</span></a>
      </div></div><div className="contact-panel"><ContactForm /></div></div></CollapsibleSection>
    </main>
    <footer className="site-footer page-wrap"><span>© {new Date().getFullYear()} {profile.name}</span><span>Built around the signal.</span><PublicStats /><a href="#main">Back to top ↑</a></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
  </></CollapsibleSectionsProvider>;
}
