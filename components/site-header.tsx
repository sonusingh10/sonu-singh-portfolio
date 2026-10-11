import { profile } from "@/content/profile";

export function SiteHeader() {
  return <header className="site-header"><a className="wordmark" href="/"><span className="wordmark-mark" aria-hidden="true">SS</span><span>{profile.name}</span></a><nav aria-label="Main navigation"><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#contact">Contact</a><a className="nav-resume" href="/resume.pdf" download data-interaction>Résumé <span aria-hidden="true">↗</span></a></nav></header>;
}
