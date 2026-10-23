// Zero-dependency static server. Needs ONLY Node.js (no npm install).
// Serves the prebuilt site from ./out and falls back to ./public, so a photo you drop into
// public/photo.jpg (or public/projects/*.jpg) shows up immediately without rebuilding.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";

const root = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(root, "out");
const publicDir = path.join(root, "public");
const port = Number(process.env.PORT) || 3000;

if (!fs.existsSync(path.join(outDir, "index.html"))) {
  console.error("\n  The prebuilt site (the 'out' folder) was not found.");
  console.error("  Run the 'Edit mode' launcher instead, or run:  npm install && npm run build:static\n");
  process.exit(1);
}

const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".gif": "image/gif", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".pdf": "application/pdf",
  ".map": "application/json",
};

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  for (const base of [outDir, publicDir]) {
    const target = path.normalize(path.join(base, clean));
    if (!target.startsWith(base)) continue; // block path traversal
    const candidates = [target, target + ".html", path.join(target, "index.html")];
    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
    }
  }
  return null;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url || "/");
  if (!file) {
    const nf = path.join(outDir, "404.html");
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "<h1>404 — Not found</h1>");
    return;
  }
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, {
    "Content-Type": types[ext] || "application/octet-stream",
    "Cache-Control": file.includes(`${path.sep}_next${path.sep}`) ? "public, max-age=31536000, immutable" : "no-cache",
  });
  fs.createReadStream(file).pipe(res);
});

function open(url) {
  const cmd = process.platform === "win32" ? `start "" "${url}"` : process.platform === "darwin" ? `open "${url}"` : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error(`\n  Port ${port} is already in use. Close the other window/program, or run with a different port:`);
    console.error(`  Windows: set PORT=3100 && node serve.mjs     Mac/Linux: PORT=3100 node serve.mjs\n`);
  } else console.error(e);
  process.exit(1);
});

server.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`\n  Portfolio running at ${url}\n  (keep this window open; press Ctrl+C to stop)\n`);
  if (!process.env.NO_OPEN) open(url);
});
