interface PreparedStatement {
  first<T>(): Promise<T | null>;
}

interface AnalyticsDatabase {
  prepare(query: string): PreparedStatement;
}

interface Env {
  ANALYTICS_DB?: AnalyticsDatabase;
  ANALYTICS_ADMIN_TOKEN?: string;
  SHOW_PUBLIC_COUNTERS?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

type CountsRow = { pageViews: number; resumeDownloads: number };

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store, private", "X-Content-Type-Options": "nosniff" } });
}

async function tokenMatches(candidate: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [candidateHash, secretHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
    crypto.subtle.digest("SHA-256", encoder.encode(secret)),
  ]);
  const a = new Uint8Array(candidateHash);
  const b = new Uint8Array(secretHash);
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a[index] ^ b[index];
  return difference === 0;
}

export async function onRequestGet({ request, env }: PagesContext): Promise<Response> {
  if (!env.ANALYTICS_DB) return json({ error: "Analytics storage is not configured." }, 503);

  const isPublic = env.SHOW_PUBLIC_COUNTERS === "true";
  if (!isPublic) {
    const authorization = request.headers.get("authorization") ?? "";
    const candidate = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
    if (!env.ANALYTICS_ADMIN_TOKEN) return json({ error: "Owner access is not configured." }, 503);
    if (!candidate || !(await tokenMatches(candidate, env.ANALYTICS_ADMIN_TOKEN))) return json({ error: "Unauthorized." }, 401);
  }

  const row = await env.ANALYTICS_DB.prepare(
    "SELECT COALESCE(MAX(CASE WHEN metric = 'page_view' THEN value END), 0) AS pageViews, COALESCE(MAX(CASE WHEN metric = 'resume_download' THEN value END), 0) AS resumeDownloads FROM analytics_totals",
  ).first<CountsRow>();

  return json({ pageViews: Number(row?.pageViews ?? 0), resumeDownloads: Number(row?.resumeDownloads ?? 0) });
}
