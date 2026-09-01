import { Link } from "react-router-dom";
import { about, site, top15, tools, toolGroups, docs } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Icon from "@/lib/icons";

export default function About() {
  return (
    <main>
      <section className="about-hero">
        <div
          className="gif-bg"
          aria-hidden="true"
          data-bg-src="/images/Google99.gif"
          style={{ backgroundImage: "url(/images/Google99.gif)" }}
        />
        <Reveal className="about-hero-inner">
          <span className="section-kicker">关于我们</span>
          <h1 className="section-title">我们是谁，在做什么</h1>
          <p className="section-desc about-lead">{about.lead}</p>
        </Reveal>
      </section>

      <section className="section about-features">
        <div className="about-grid">
          {about.features.map((f) => (
            <Reveal as="article" key={f.title} className="about-card">
              <span className="about-icon">
                <Icon name={f.icon} size={22} />
              </span>
              <h3 className="about-name">{f.title}</h3>
              <p className="about-desc">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section about-mission">
        <Reveal className="join-card">
          <div className="join-copy">
            <span className="section-kicker light">我们的使命</span>
            <h2 className="join-title">{about.mission.title}</h2>
            <p className="join-sub">{about.mission.desc}</p>
            <div className="about-stats">
              <div>
                <strong>{top15.length + tools.length}</strong>
                <span>精选工具</span>
              </div>
              <div>
                <strong>{toolGroups.length}</strong>
                <span>工具分类</span>
              </div>
              <div>
                <strong>{docs.length}</strong>
                <span>实战文章</span>
              </div>
            </div>
            <div className="join-actions">
              <a className="btn btn-primary" href={site.joinUrl} target="_blank" rel="noopener">
                点击加入 QQ 频道
              </a>
              <Link className="btn btn-ghost" to="/">
                返回首页
              </Link>
            </div>
          </div>
          <div className="join-visual" aria-hidden="true">
            <div className="join-pulse" />
            <svg viewBox="0 0 120 120" width="160" height="160" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="60" cy="60" r="54" />
              <circle cx="60" cy="60" r="38" />
              <circle cx="60" cy="60" r="20" />
              <path d="M60 6v108M6 60h108" />
            </svg>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
