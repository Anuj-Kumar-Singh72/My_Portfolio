// Cross-platform: builds the static (plain HTML/JS) version of the site into ./out
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

const r = spawnSync(process.execPath, [nextBin, "build"], {
  stdio: "inherit",
  env: { ...process.env, STATIC_EXPORT: "1" },
});
process.exit(r.status ?? 1);
