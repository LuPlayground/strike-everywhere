import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "site");
const dist = join(root, "packages", "widget", "dist");
const SITE = "https://strike-everywhere.pages.dev";
if (!existsSync(join(dist, "strike-everywhere.iife.js"))) {
  console.error("Widget not built. Run: npm run build -w @strike-everywhere/widget");
  process.exit(1);
}

const version = JSON.parse(readFileSync(join(root, "packages", "widget", "package.json"), "utf8")).version;
const iife = readFileSync(join(dist, "strike-everywhere.iife.js"));
const sri = "sha384-" + createHash("sha384").update(iife).digest("base64");

const releases = join(root, "releases");
const archived = join(releases, `v${version}`);
const FILES = ["strike-everywhere.iife.js", "strike-everywhere.iife.js.map", "strike-everywhere.js", "strike-everywhere.js.map"];
if (existsSync(archived)) {
  if (!readFileSync(join(archived, "strike-everywhere.iife.js")).equals(iife)) {
    console.error(`Widget v${version} is already released with different code. Bump "version" in packages/widget/package.json.`);
    process.exit(1);
  }
} else {
  if (process.env.SKIP_RELEASE_CHECK !== "1") {
    try {
      const res = await fetch(`${SITE}/widget/v${version}/strike-everywhere.iife.js`, { cache: "no-store" });
      const body = res.ok ? Buffer.from(await res.arrayBuffer()) : null;
      if (body && !body.subarray(0, 64).toString("utf8").trimStart().startsWith("<") && !body.equals(iife)) {
        console.error(`Widget v${version} is already published with different code. Bump "version" in packages/widget/package.json.`);
        process.exit(1);
      }
    } catch (e) {
      console.error(`Couldn't check whether widget v${version} is already published (${e.message}). Set SKIP_RELEASE_CHECK=1 to build offline (don't deploy that build).`);
      process.exit(1);
    }
  }
  mkdirSync(archived, { recursive: true });
  for (const f of FILES) cpSync(join(dist, f), join(archived, f));
  console.log(`archived new release v${version} in releases/ (commit it)`);
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(dist, join(out, "widget"), { recursive: true });
const versions = {};
for (const v of readdirSync(releases).filter((d) => /^v\d+\.\d+\.\d+$/.test(d))) {
  cpSync(join(releases, v), join(out, "widget", v), { recursive: true });
  versions[v.slice(1)] = "sha384-" + createHash("sha384").update(readFileSync(join(releases, v, "strike-everywhere.iife.js"))).digest("base64");
}
writeFileSync(
  join(out, "widget", "release.json"),
  JSON.stringify({ version, iife: { path: `/widget/v${version}/strike-everywhere.iife.js`, integrity: sri }, esm: { path: `/widget/v${version}/strike-everywhere.js` }, versions }, null, 2) + "\n",
);
cpSync(join(root, "apps", "landing"), out, { recursive: true });
cpSync(join(root, "apps", "demo-portfolio"), join(out, "demo", "portfolio"), { recursive: true });
cpSync(join(root, "apps", "demo-wallet"), join(out, "demo", "wallet"), { recursive: true });
cpSync(join(root, "apps", "demo-dex"), join(out, "demo", "dex"), { recursive: true });
cpSync(join(root, "apps", "dashboard"), join(out, "dashboard"), { recursive: true });
cpSync(join(root, "apps", "developers"), join(out, "developers"), { recursive: true });

const fill = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) fill(p);
    else if (name.endsWith(".html")) {
      const s = readFileSync(p, "utf8");
      if (s.includes("%%WIDGET_")) writeFileSync(p, s.replaceAll("%%WIDGET_VERSION%%", version).replaceAll("%%WIDGET_SRI%%", sri));
    }
  }
};
fill(out);

writeFileSync(
  join(out, "_headers"),
  [
    "/widget/*",
    "  Access-Control-Allow-Origin: *",
    "/widget/strike-everywhere*",
    "  Cache-Control: public, max-age=300",
    "/widget/v*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "/*",
    "  X-Content-Type-Options: nosniff",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  X-Frame-Options: DENY",
    "  Content-Security-Policy: frame-ancestors 'none'",
    "",
  ].join("\n"),
);
for (const doc of ["README.md", join("docs", "INTEGRATION.md")]) {
  const p = join(root, doc);
  const s = readFileSync(p, "utf8");
  const next = s.replace(/\/widget\/v\d+\.\d+\.\d+\//g, `/widget/v${version}/`).replace(/release `v\d+\.\d+\.\d+`/g, `release \`v${version}\``).replace(/sha384-[A-Za-z0-9+/]{64}/g, sri);
  if (next !== s) writeFileSync(p, next);
}

writeFileSync(join(out, "_redirects"), ["/demo/blog /#demos 301", "/demo/blog/* /#demos 301", ""].join("\n"));
console.log(`site assembled at ${out} (widget v${version}, ${sri})`);
