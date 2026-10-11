import { profile } from "@/content/profile";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { BlurTextWrapper } from "@/components/react-bits/blur-text-wrapper";
import { MagnetAction } from "@/components/react-bits/magnet-action";

const personJsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: profile.name,
  jobTitle: "Technical Account Manager", description: profile.seo.description,
  email: `mailto:${profile.email}`, address: { "@type": "PostalAddress", addressLocality: "Kraków", addressCountry: "PL" },
  url: profile.seo.siteUrl,
  sameAs: [profile.socialLinks.linkedin, profile.socialLinks.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.institution },
  knowsAbout: profile.skills.flatMap(group => group.items),
};

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <section className="hero page-wrap" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /><span className="eyebrow-location">Based in {profile.location}</span><span className="eyebrow-divider">/</span><span className="availability-copy">{profile.availability}</span></p>
          <h1 id="hero-title">Make the complex<br /><em>make sense.</em></h1>
          <div className="hero-intro"><p>{profile.headline}</p><span className="hero-index">01 <i /> 05</span></div>
          <div className="hero-actions"><MagnetAction href="#contact"><span>Contact me</span><span aria-hidden="true">↗</span></MagnetAction><a className="text-link" href="/resume.pdf" download>Download résumé <span aria-hidden="true">↓</span></a></div>
          <div className="hero-role"><span>FOCUS</span><span>{profile.role}</span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orb orb-one" /><div className="orb orb-two" /><div className="hero-crosshair crosshair-a" /><div className="hero-crosshair crosshair-b" /><div className="hero-diagram"><span>EDGE</span><i /><span>CORE</span><i /><span>YOU</span></div><div className="hero-coordinates">50°03′N<br />19°56′E</div><div className="hero-art-caption">Network paths<br />and human outcomes</div></div>
      </section>

      <section className="ticker" aria-label="Areas of expertise"><div className="ticker-inner"><span>OBSERVABILITY</span><i>✳</i><span>NETWORK SECURITY</span><i>✳</i><span>TECHNICAL SUCCESS</span><i>✳</i><span>PERFORMANCE</span></div></section>

      <section className="section about-section page-wrap" id="about">
        <div className="section-label"><span>01 / ABOUT</span><span>THE THROUGH LINE</span></div>
        <div className="about-grid"><h2>Technical depth.<br /><em>Human clarity.</em></h2><div className="about-copy">{profile.about.map((paragraph, i) => <p key={i}>{paragraph}</p>)}<div className="principles">{profile.principles.map(item => <span key={item}>{item}</span>)}</div><div className="motion-support"><BlurTextWrapper text="Trace the signal. Find the layer. Share what matters." /></div></div></div>
      </section>

      <section className="section experience-section" id="experience"><div className="page-wrap"><div className="section-label"><span>02 / EXPERIENCE</span><span>FIELD NOTES FROM THE WORK</span></div><h2 className="section-heading">Make progress <em>visible.</em></h2>
        <div className="experience-list">{profile.experience.map((job, i) => <article className="experience-item" key={job.company}><div className="experience-meta"><span className="experience-number">0{i + 1}</span><span>{job.dates}</span></div><div className="experience-main"><div className="job-heading"><h3>{job.role}</h3><p>{job.company} <span>·</span> {job.location}</p></div><p className="job-summary">{job.summary}</p><ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div>
      </div></section>

      <section className="section projects-section page-wrap" id="projects"><div className="section-label"><span>03 / SELECTED PROJECT</span><span>BUILT WITH CURIOSITY</span></div><div className="project-header"><h2 className="section-heading">A place to learn<br /><em>by layers.</em></h2><span className="project-count">01 / 01</span></div>
        {profile.projects.map(project => <SpotlightCard key={project.name} className="project-card"><div className="project-image-wrap"><img className="project-image" src={project.image} alt={project.imageAlt} width={1440} height={1000} loading="lazy" /><span className="image-stamp">LIVE PROJECT <i>↗</i></span></div><div className="project-copy"><p className="eyebrow project-eyebrow">{project.label} <span>/</span> {project.role}</p><h3>{project.name}</h3><p className="project-lede">{project.outcome}</p><div className="project-story"><div><span>THE QUESTION</span><p>{project.problem}</p></div><div><span>THE APPROACH</span><p>{project.approach}</p></div></div><a className="project-link" href={project.url} target="_blank" rel="noreferrer">Explore 7LayerX <span aria-hidden="true">↗</span></a></div></SpotlightCard>)}
      </section>

      <section className="section skills-section"><div className="page-wrap"><div className="section-label"><span>04 / TOOLKIT</span><span>DEPTH BUILT IN PRACTICE</span></div><h2 className="section-heading">Know the path.<br /><em>Know the tools.</em></h2><div className="skills-grid">{profile.skills.map(group => <article className="skill-group" key={group.number}><span className="skill-number">{group.number}</span><h3>{group.title}</h3><p>{group.refrain}</p><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div><div className="certifications"><span className="cert-label">CERTIFICATIONS</span><p>{profile.certifications.join("  ·  ")}</p></div><div className="education"><span className="cert-label">EDUCATION</span><p><strong>{profile.education.degree}</strong>, {profile.education.field}<br />{profile.education.institution} <span>·</span> {profile.education.dates}</p></div></div></section>

      <section className="contact-section" id="contact"><div className="page-wrap contact-grid"><div className="contact-copy"><div className="section-label"><span>05 / CONTACT</span><span>START A CONVERSATION</span></div><p className="contact-kicker">Good work starts with a clear signal.</p><h2>What are you<br /><em>working on?</em></h2><p className="contact-note">Open to roles, freelance work, and collaborations in network security, observability, and technical customer success.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<span aria-hidden="true">↗</span></a><div className="social-links"><a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.socialLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></div><div className="contact-panel"><ContactForm /></div></div></section>
    </main>
    <footer className="site-footer page-wrap"><span>© {new Date().getFullYear()} {profile.name}</span><span>Built around the signal.</span><a href="#main">Back to top ↑</a></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
  </>;
}
