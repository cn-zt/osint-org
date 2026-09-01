import { useEffect, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getDoc, docGroupById } from "@/lib/data";
import Markdown from "@/components/Markdown";
import Toc, { extractToc } from "@/components/Toc";

function formatDate(value) {
  if (!value) return "";
  const s = String(value).trim();
  const d = new Date(s.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return s;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function DocPost() {
  const { group, slug } = useParams();
  const post = getDoc(group, slug);
  const toc = useMemo(() => (post ? extractToc(post.body) : []), [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [group, slug]);

  if (!post) return <Navigate to="/docs" replace />;

  return (
    <main className="post-main">
      <Link className="post-back" to="/docs">
        &larr; 返回文档列表
      </Link>
      <header className="post-header">
        <div className="post-meta">
          <span className="post-cat">{docGroupById[group]?.name || group}</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.author}</span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-excerpt">{post.excerpt}</p>
      </header>

      <div className="post-layout">
        <article>
          <Markdown>{post.body}</Markdown>
        </article>
        <Toc items={toc} />
      </div>
    </main>
  );
}
