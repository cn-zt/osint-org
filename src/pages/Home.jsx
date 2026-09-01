import { Link } from "react-router-dom";
import { site, top15, latest, docs, toolGroups, toolGroupById } from "@/lib/data";
import Reveal from "@/components/Reveal";

const heroBgImages = ["/images/01.jpg", "/images/02.jpg", "/images/03.jpg"];

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" data-bg-src={heroBgImages.join(",")}>
        {heroBgImages.map((src, i) => (
          <span
            key={src}
            className={`hero-bg-slide s${i + 1}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <div className="hero-inner">
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="dot" />
              {site.tagline} · 持续更新
            </span>
          </Reveal>
          <Reveal>
            <h1 className="hero-title">
              从公开渠道，
              <br />
              <span className="grad-line">提炼有价值的情报</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="hero-sub">{site.heroDesc}</p>
          </Reveal>
          <Reveal className="hero-actions">
            <a className="btn btn-primary" href={site.joinUrl} target="_blank" rel="noopener">
              加入社区
            </a>
            <Link className="btn btn-ghost" to="/tools">
              浏览工具库
            </Link>
          </Reveal>
          <Reveal>
            <dl className="hero-stats">
              <div>
                <dt>{top15.length}</dt>
                <dd>精选工具</dd>
              </div>
              <div>
                <dt>{toolGroups.length}</dt>
                <dd>工具分类</dd>
              </div>
              <div>
                <dt>{docs.length}</dt>
                <dd>实战文章</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal className="hero-panel" aria-hidden="true">
          <div className="radar">
            <span className="radar-ring r1" />
            <span className="radar-ring r2" />
            <span className="radar-ring r3" />
            <span className="radar-sweep" />
            <span className="radar-node n1" />
            <span className="radar-node n2" />
            <span className="radar-node n3" />
            <span className="radar-node n4" />
          </div>
          <div className="panel-meta">
            <span className="live">
              <span className="live-dot" />
              LIVE SCAN
            </span>
            <span>osint.community</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HomeVideo() {
  return (
    <section className="section" id="showcase">
      <Reveal className="home-video-card">
        <video
          className="home-video"
          src="/images/recording.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="auto"
        />
      </Reveal>
    </section>
  );
}

function Top15() {
  return (
    <section className="section" id="top15">
      <Reveal className="section-head">
        <span className="section-kicker">Top 15</span>
        <h2 className="section-title">社区精选开源情报工具</h2>
        <p className="section-desc">由社区投票与编辑评选出的高质量工具榜单，覆盖侦察、分析与取证各环节。</p>
      </Reveal>
      <ol className="top15-list">
        {top15.map((t) => (
          <Reveal as="li" key={t.rank} className="top15-item">
            <span className="top15-rank">{String(t.rank).padStart(2, "0")}</span>
            <div className="top15-main">
              <h3 className="top15-name">
                {t.name}
                <span className="top15-cat">{t.category}</span>
              </h3>
              <p className="top15-desc">{t.desc}</p>
            </div>
            <div className="top15-right">
              <div className="top15-hot">
                <b>{t.hot}</b>
                <span>热度</span>
              </div>
              <span className="top15-bar" aria-hidden="true">
                <i style={{ width: `${t.hot}%` }} />
              </span>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Latest() {
  return (
    <section className="section" id="latest">
      <Reveal className="section-head">
        <span className="section-kicker">最新收录</span>
        <h2 className="section-title">新上架工具</h2>
        <p className="section-desc">最近收录的开源情报工具与面板，保持对社区动态的跟进。</p>
      </Reveal>
      <div className="latest-grid">
        {latest.map((t) => (
          <Reveal as={Link} key={t.slug} to={`/tools/${t.group}/${t.slug}`} className="latest-card">
            <span className="latest-date">{t.addedAt}</span>
            <h3 className="latest-name">{t.name}</h3>
            <p className="latest-desc">{t.desc}</p>
            <span className="latest-tag">{toolGroupById[t.group]?.name || t.group}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Join() {
  const { cta } = site;
  return (
    <section className="join" id="join">
      <Reveal className="join-card">
        <div className="join-copy">
          <span className="section-kicker light">{cta.kicker}</span>
          <h2 className="join-title">{cta.title}</h2>
          <p className="join-sub">{cta.desc}</p>
          <div className="join-actions">
            <a className="btn btn-primary" href={site.joinUrl} target="_blank" rel="noopener">
              {cta.primaryText}
            </a>
            <Link className="btn btn-ghost" to="/tools">
              {cta.secondaryText}
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
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeVideo />
      <Top15 />
      <Latest />
      <Join />
    </main>
  );
}
