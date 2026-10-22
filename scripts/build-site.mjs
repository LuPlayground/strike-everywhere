import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "site");
const dist = join(root, "packages", "widget", "dist");
if (!existsSync(join(dist, "strike-everywhere.iife.js"))) {
  console.error("Widget not built. Run: npm run build -w @strike-everywhere/widget");
  process.exit(1);
}
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(dist, join(out, "widget"), { recursive: true });
cpSync(join(root, "apps", "landing"), out, { recursive: true });
cpSync(join(root, "apps", "demo-portfolio"), join(out, "demo", "portfolio"), { recursive: true });
cpSync(join(root, "apps", "demo-wallet"), join(out, "demo", "wallet"), { recursive: true });
cpSync(join(root, "apps", "demo-dex"), join(out, "demo", "dex"), { recursive: true });
cpSync(join(root, "apps", "dashboard"), join(out, "dashboard"), { recursive: true });
cpSync(join(root, "apps", "developers"), join(out, "developers"), { recursive: true });
writeFileSync(
  join(out, "_headers"),
  [
    "/widget/*",
    "  Access-Control-Allow-Origin: *",
    "  Cache-Control: public, max-age=300",
    "/*",
    "  X-Content-Type-Options: nosniff",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "",
  ].join("\n"),
);
writeFileSync(join(out, "_redirects"), ["/demo/blog /#demos 301", "/demo/blog/* /#demos 301", ""].join("\n"));
console.log("site assembled at", out);
