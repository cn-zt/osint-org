// Shiki 高亮器单例（懒加载，代码块统一 github-dark 主题）
import { createHighlighter } from "shiki";

const LANGS = [
  "bash", "shell", "sh", "zsh",
  "python", "javascript", "typescript", "json", "jsonc",
  "yaml", "markdown", "html", "css", "xml",
  "go", "rust", "java", "c", "cpp", "sql", "dockerfile", "ini", "toml",
  "text", "plaintext"
];

let promise = null;

export function getHighlighter() {
  if (!promise) {
    promise = createHighlighter({
      themes: ["github-dark"],
      langs: LANGS
    });
  }
  return promise;
}

export function normalizeLang(lang) {
  if (!lang) return "text";
  const l = String(lang).toLowerCase();
  if (l === "console" || l === "powershell" || l === "cmd") return "bash";
  if (l === "js") return "javascript";
  if (l === "ts") return "typescript";
  if (l === "py") return "python";
  if (l === "yml") return "yaml";
  if (l === "md") return "markdown";
  return LANGS.includes(l) ? l : "text";
}
