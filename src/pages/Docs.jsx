import { useState } from "react";
import { Link } from "react-router-dom";
import { docs, docGroups, docGroupById } from "@/lib/data";
import Reveal from "@/components/Reveal";
import VideoBg from "@/components/VideoBg";

export default function Docs() {
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? docs : docs.filter((d) => d.group === cat);

  return (
    <main>
      <section className="blog-hero">
        <VideoBg src="/images/libai.mp4" />
        <div className="blog-hero-inner">
          <Reveal>
            <span className="section-kicker">文档中心</span>
            <h1 className="blog-hero-title">社区教程与实战博客</h1>
            <p className="blog-hero-sub">
              来自社区的开源情报方法论、工具评测与实战复盘。文档以 <b>Markdown</b> 编写，按组别归档，支持 GitHub Flavored Markdown 扩展语法。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section res-filter-section">
        <div className="res-filter" role="tablist" aria-label="文档组别">
          <button
            type="button"
            role="tab"
            aria-selected={cat === "all"}
            className={`res-tab${cat === "all" ? " active" : ""}`}
            onClick={() => setCat("all")}
          >
            <span>全部</span>
          </button>
          {docGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={cat === g.id}
              className={`res-tab${cat === g.id ? " active" : ""}`}
              onClick={() => setCat(g.id)}
            >
              <span>{g.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="blog-list-section">
        <div className="blog-grid">
          {list.map((p) => (
            <Reveal as={Link} key={`${p.group}/${p.slug}`} to={`/docs/${p.group}/${p.slug}`} className="post-card">
              <div className="post-card-meta">
                <span className="post-cat">{docGroupById[p.group]?.name || p.group}</span>
                <span>{p.date}</span>
              </div>
              <h2 className="post-card-title">{p.title}</h2>
              <p className="post-card-excerpt">{p.excerpt}</p>
              <div className="post-card-foot">
                <span className="post-card-author">{p.author}</span>
              </div>
              <span className="post-card-more">
                阅读全文 <span aria-hidden="true">&rarr;</span>
              </span>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
