import { useState } from "react";
import { Link } from "react-router-dom";
import { tools, toolGroups, toolGroupById } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Icon from "@/lib/icons";

export default function Tools() {
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? tools : tools.filter((t) => t.group === cat);

  return (
    <main>
      <section className="res-hero">
        <div
          className="gif-bg"
          aria-hidden="true"
          data-bg-src="/images/Google910.gif"
          style={{ backgroundImage: "url(/images/Google910.gif)" }}
        />
        <Reveal className="res-hero-inner">
          <span className="section-kicker">工具库</span>
          <h1 className="section-title">精选开源情报工具</h1>
          <p className="section-desc res-lead">
            按组别浏览社区收录的开源情报工具与公开数据源，覆盖搜索引擎、社交人员、地理空间、域名网络、图像视频与公开数据库六大方向。点击工具查看详情文档。
          </p>
        </Reveal>
      </section>

      <section className="section res-filter-section">
        <div className="res-filter" role="tablist" aria-label="工具组别">
          <button
            type="button"
            role="tab"
            aria-selected={cat === "all"}
            className={`res-tab${cat === "all" ? " active" : ""}`}
            onClick={() => setCat("all")}
          >
            <span>全部</span>
          </button>
          {toolGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={cat === g.id}
              className={`res-tab${cat === g.id ? " active" : ""}`}
              onClick={() => setCat(g.id)}
            >
              <Icon name={g.icon} size={16} strokeWidth={1.5} />
              <span>{g.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section res-list-section">
        <div className="res-grid">
          {list.map((it) => {
            const g = toolGroupById[it.group] || {};
            return (
              <Reveal as={Link} key={`${it.group}/${it.slug}`} to={`/tools/${it.group}/${it.slug}`} className="res-item">
                <div className="res-icon">
                  <Icon name={g.icon || "compass"} size={24} strokeWidth={1.5} />
                </div>
                <div className="res-item-body">
                  <div className="res-item-head">
                    <h3 className="res-name">{it.name}</h3>
                    <span className="res-cat">{g.name}</span>
                  </div>
                  <p className="res-desc">{it.desc}</p>
                </div>
                <span className="res-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
