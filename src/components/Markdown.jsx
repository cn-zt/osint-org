import { Children, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { getHighlighter, normalizeLang } from "@/lib/shiki";
import Icon from "@/lib/icons";

/* ---------- 代码块：macOS 窗口 + Shiki 高亮 + 右上角复制按钮 ---------- */
function CodeBlock({ lang, code }) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    getHighlighter().then((h) => {
      if (!alive) return;
      try {
        setHtml(h.codeToHtml(code, { lang: normalizeLang(lang), theme: "github-dark" }));
      } catch {
        setHtml("");
      }
    });
    return () => {
      alive = false;
    };
  }, [lang, code]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="code-window">
      <div className="code-titlebar">
        <span className="lights">
          <span className="lt lt-close" />
          <span className="lt lt-min" />
          <span className="lt lt-max" />
        </span>
        <span className="code-lang">{normalizeLang(lang)}</span>
        <button
          type="button"
          className={`code-copy${copied ? " copied" : ""}`}
          onClick={onCopy}
          aria-label="复制代码"
        >
          <Icon name={copied ? "check" : "copy"} size={13} strokeWidth={1.8} />
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <div className="code-shell">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre>
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

/* ---------- 工具函数 ---------- */
function textOf(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return textOf(node.props?.children);
}

export function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[：:，,。.!！?？()[\]【】<>《》/\\|]+/g, "");
}

function findTaskChecked(children) {
  let found = false;
  Children.forEach(children, (child) => {
    if (found || !child?.props) return;
    if (child.type === "input") {
      found = Boolean(child.props.checked ?? child.props.defaultChecked);
      return;
    }
    if (child.props.children) found = findTaskChecked(child.props.children);
  });
  return found;
}

/* ---------- react-markdown 自定义组件 ---------- */
const components = {
  pre({ children }) {
    const child = Children.toArray(children).find((c) => c?.props);
    const className = child?.props?.className || "";
    const m = /language-([\w-]+)/.exec(className);
    const code = textOf(child?.props?.children).replace(/\n$/, "");
    return <CodeBlock lang={m?.[1]} code={code} />;
  },
  code({ className, children }) {
    return <code className={className}>{children}</code>;
  },
  table({ children }) {
    return (
      <div className="md-table-wrap">
        <table>{children}</table>
      </div>
    );
  },
  li({ className, children, ...props }) {
    const isTask = className?.includes("task-list-item");
    if (!isTask) {
      return (
        <li className={className} {...props}>
          {children}
        </li>
      );
    }
    const done = findTaskChecked(children);
    return (
      <li className={`task-item${done ? " done" : ""}`} {...props}>
        {children}
      </li>
    );
  },
  a({ href, children, ...props }) {
    const external = /^https?:\/\//.test(href || "");
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...props}>
        {children}
      </a>
    );
  },
  h1({ children, ...props }) {
    return (
      <h1 id={slugify(textOf(children))} {...props}>
        {children}
      </h1>
    );
  },
  h2({ children, ...props }) {
    return (
      <h2 id={slugify(textOf(children))} {...props}>
        {children}
      </h2>
    );
  },
  h3({ children, ...props }) {
    return (
      <h3 id={slugify(textOf(children))} {...props}>
        {children}
      </h3>
    );
  }
};

export default function Markdown({ children }) {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
