import { useEffect, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getTool, toolGroupById } from "@/lib/data";
import Markdown from "@/components/Markdown";
import Icon from "@/lib/icons";
import Toc, { extractToc } from "@/components/Toc";

function formatDate(value) {
  if (!value) return "";
  const s = String(value).trim();
  const d = new Date(s.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return s;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ToolDetail() {
  const { group, slug } = useParams();
  const tool = getTool(group, slug);
  const g = toolGroupById[group] || {};
  const toc = useMemo(() => (tool ? extractToc(tool.body) : []), [tool]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [group, slug]);

  if (!tool) return <Navigate to="/tools" replace />;

  return (
    <main className="post-main">
      <Link className="post-back" to="/tools">
        &larr; 返回工具库
      </Link>
      <header className="post-header">
        <div className="post-meta">
          <span className="post-cat">
            <Icon name={g.icon || "compass"} size={13} strokeWidth={1.8} /> {g.name || group}
          </span>
          <span>收录于 {formatDate(tool.date || tool.addedAt)}</span>
        </div>
        <h1 className="post-title">{tool.name}</h1>
        <p className="post-excerpt">{tool.desc}</p>
      </header>

      <div className="post-layout">
        <article>
          <Markdown>{tool.body}</Markdown>
          <div className="tool-visit">
            <a className="btn btn-primary" href={tool.url} target="_blank" rel="noopener">
              访问资源 &rarr;
            </a>
          </div>
        </article>
        <Toc items={toc} />
      </div>
    </main>
  );
}
