"use client";

import { FormEvent, useEffect, useState } from "react";

type Counts = { pageViews: number; resumeDownloads: number };
const publicCountsEnabled = process.env.NEXT_PUBLIC_SHOW_PUBLIC_COUNTERS === "true";

function EyeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>;
}

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/></svg>;
}

export function PublicStats() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    if (!publicCountsEnabled) return;
    void fetch("/api/stats", { cache: "no-store" })
      .then(response => response.ok ? response.json() as Promise<Counts> : null)
      .then(data => { if (data) setCounts(data); })
      .catch(() => {});
  }, []);

  if (!publicCountsEnabled || !counts) return null;
  return <div className="public-stats" aria-label="Portfolio activity">
    <span title="Aggregate page loads"><EyeIcon />{counts.pageViews.toLocaleString()}</span>
    <span title="Résumé download clicks"><DownloadIcon />{counts.resumeDownloads.toLocaleString()}</span>
  </div>;
}

export function PrivateAnalyticsDashboard() {
  const [token, setToken] = useState("");
  const [counts, setCounts] = useState<Counts | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadCounts(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    setCounts(null);
    try {
      const response = await fetch("/api/stats", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
      if (!response.ok) {
        setError(response.status === 503 ? "Analytics storage is not connected yet. Follow the Cloudflare setup in DEPLOYMENT.md." : "That access key was not accepted.");
        return;
      }
      setCounts(await response.json() as Counts);
    } catch {
      setError("Could not reach the analytics service. Check that the site is deployed with its Cloudflare Function.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="insights-page page-wrap">
    <a className="insights-back" href="/">← Back to portfolio</a>
    <p className="eyebrow insights-eyebrow">PRIVATE OWNER VIEW</p>
    <h1>Site <em>activity.</em></h1>
    <p className="insights-intro">View aggregate page loads and résumé download clicks. No visitor identity or IP address is stored.</p>
    {!counts ? <form className="insights-login" onSubmit={loadCounts}>
      <label htmlFor="insights-token">Owner access key</label>
      <input id="insights-token" type="password" value={token} onChange={event => setToken(event.target.value)} autoComplete="current-password" required />
      <button className="button button-dark" type="submit" disabled={loading}>{loading ? "Loading…" : "View counts"}<span aria-hidden="true">↗</span></button>
      {error && <p className="insights-error" role="alert">{error}</p>}
    </form> : <>
      <div className="insights-counts">
        <article><EyeIcon /><span>PAGE LOADS</span><strong>{counts.pageViews.toLocaleString()}</strong></article>
        <article><DownloadIcon /><span>RÉSUMÉ DOWNLOADS</span><strong>{counts.resumeDownloads.toLocaleString()}</strong></article>
      </div>
      <p className="insights-note">These are event totals, not unique people. Repeat visits and repeat downloads are counted again.</p>
      <button className="insights-lock" type="button" onClick={() => { setCounts(null); setToken(""); }}>Lock this view</button>
    </>}
  </main>;
}
