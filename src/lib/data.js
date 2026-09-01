// 数据层：统一从 data/ 目录读取 JSON 与分组 Markdown
import YAML from "yaml";
import site from "@data/site.json";
import about from "@data/about.json";
import download from "@data/download.json";

export { site, about, download };

export const docGroups = site.docGroups;
export const toolGroups = site.toolGroups;
export const toolGroupById = Object.fromEntries(toolGroups.map((g) => [g.id, g]));
export const docGroupById = Object.fromEntries(docGroups.map((g) => [g.id, g]));

/* ---------- Markdown 解析：frontmatter + 正文，组别来自目录名 ---------- */
function parseMd(raw, path) {
  // 路径形态：.../<group>/<slug>.md（top15 无 group 时 group 为文件名目录）
  const parts = path.split("/");
  const slug = parts.pop().replace(/\.md$/, "");
  const group = parts.pop();
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { slug, group, body: raw };
  let meta = {};
  try {
    meta = YAML.parse(m[1]) || {};
  } catch {
    meta = {};
  }
  return { slug, group, ...meta, body: raw.slice(m[0].length) };
}

const toList = (files) => Object.entries(files).map(([path, raw]) => parseMd(raw, path));

/* ---------- 文档：data/post/<group>/<slug>.md ---------- */
export const docs = toList(
  import.meta.glob("@data/post/*/*.md", { eager: true, query: "?raw", import: "default" })
).sort((a, b) => String(b.date).localeCompare(String(a.date)));

export function getDoc(group, slug) {
  return docs.find((d) => d.group === group && d.slug === slug);
}

/* ---------- 工具：data/resources/<group>/<slug>.md ---------- */
export const tools = toList(
  import.meta.glob("@data/resources/*/*.md", { eager: true, query: "?raw", import: "default" })
).sort((a, b) => String(b.addedAt).localeCompare(String(a.addedAt)));

export function getTool(group, slug) {
  return tools.find((t) => t.group === group && t.slug === slug);
}

/* ---------- 最新收录：按 addedAt 取前 5 ---------- */
export const latest = tools.slice(0, 5);

/* ---------- Top15：data/top15/*.md ---------- */
export const top15 = toList(
  import.meta.glob("@data/top15/*.md", { eager: true, query: "?raw", import: "default" })
).sort((a, b) => a.rank - b.rank);
