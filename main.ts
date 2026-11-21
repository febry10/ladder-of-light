/**
 * The Ladder of Light — entrypoint.
 *
 * A dependency-free static server for the experience in index.html.
 * The whole piece is one self-contained page (all art is drawn by code
 * in the browser), so this file only has to do three things well:
 * serve that page, serve it with the right headers, and stay alive.
 *
 * Run:  node main.ts        (PORT env var, default 3000)
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.env.PORT ?? 3000);

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

/** Resolve a request path to a file inside ROOT, or null if it escapes. */
function safePath(urlPath: string): string | null {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^[/\\]+/, "");
  const full = join(ROOT, clean === "" ? "index.html" : clean);
  return full.startsWith(ROOT) ? full : null;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    if (url.pathname === "/health") {
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, piece: "The Ladder of Light", stops: 16 }));
      return;
    }
    const file = safePath(url.pathname);
    if (file === null) {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("bad path\n");
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, {
      "content-type": MIME[extname(file).toLowerCase()] ?? "application/octet-stream",
      "cache-control": "no-cache",
      "x-content-type-options": "nosniff",
    });
    if (req.method === "HEAD") res.end();
    else res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("not on this rung of the ladder\n");
  }
});

server.listen(PORT, () => {
  console.log(`The Ladder of Light is open at http://localhost:${PORT}`);
});

/* Close politely when the host asks us to stop. */
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 500).unref();
  });
}
