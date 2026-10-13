type EventName = "page_view" | "resume_download";

interface PreparedStatement {
  bind(...values: string[]): PreparedStatement;
  run(): Promise<unknown>;
}

interface AnalyticsDatabase {
  prepare(query: string): PreparedStatement;
}

interface Env {
  ANALYTICS_DB?: AnalyticsDatabase;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const allowedEvents = new Set<EventName>(["page_view", "resume_download"]);

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  if (!env.ANALYTICS_DB) return new Response(null, { status: 503 });

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return new Response(null, { status: 403 });
    } catch {
      return new Response(null, { status: 403 });
    }
  }

  if (!request.headers.get("content-type")?.includes("application/json")) return new Response(null, { status: 415 });
  let body: { event?: unknown };
  try {
    body = await request.json() as { event?: unknown };
  } catch {
    return new Response(null, { status: 400 });
  }

  if (typeof body.event !== "string" || !allowedEvents.has(body.event as EventName)) return new Response(null, { status: 400 });
  const metric = body.event;
  await env.ANALYTICS_DB.prepare("UPDATE analytics_totals SET value = value + 1 WHERE metric = ?").bind(metric).run();
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
