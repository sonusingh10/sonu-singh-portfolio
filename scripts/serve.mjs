import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createGzip } from "node:zlib";

const root = join(process.cwd(), "out");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".pdf": "application/pdf", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml" };
createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  let file = normalize(join(root, pathname));
  if (!file.startsWith(root)) { res.writeHead(403).end("Forbidden"); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file) && existsSync(`${file}.html`)) file += ".html";
  if (!existsSync(file) && existsSync(join(file, "index.html"))) file = join(file, "index.html");
  if (!existsSync(file) || !statSync(file).isFile()) { res.writeHead(404).end("Not found"); return; }
  const relative = file.slice(root.length).replaceAll("\\", "/");
  const immutable = relative.startsWith("/_next/static/");
  const contentType = mime[extname(file)] ?? (relative === "/social-card.png" ? "image/png" : "application/octet-stream");
  const textual = /^(text\/|application\/(javascript|json|xml))/.test(contentType) || contentType === "image/svg+xml";
  const acceptsGzip = textual && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  res.writeHead(200, {
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": immutable ? "public, max-age=31536000, immutable" : textual ? "public, max-age=0, must-revalidate" : "public, max-age=3600",
    ...(acceptsGzip ? { "Content-Encoding": "gzip", "Vary": "Accept-Encoding" } : {}),
  });
  const stream = createReadStream(file);
  if (acceptsGzip) stream.pipe(createGzip()).pipe(res);
  else stream.pipe(res);
}).listen(Number(process.env.PORT || 3000), () => console.log(`Previewing ${root} on http://localhost:${process.env.PORT || 3000}`));
