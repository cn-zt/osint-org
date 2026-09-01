import { download } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Icon from "@/lib/icons";
import pdfUrl from "@assets/book_zh-Hans.pdf?url";

export default function Download() {
  return (
    <main>
      <section className="res-hero">
        <div className="hero-bg-static" aria-hidden="true" style={{ backgroundImage: "url(images/trash-app.png)" }} />
        <Reveal className="res-hero-inner">
          <span className="section-kicker">下载中心</span>
          <h1 className="section-title">离线资料下载</h1>
          <p className="section-desc res-lead">{download.lead}</p>
        </Reveal>
      </section>

      <section className="section res-list-section">
        <div className="dl-grid">
          {download.items.map((it) => (
            <Reveal key={it.name} className="dl-card">
              <div className="res-icon">
                <Icon name="book" size={24} strokeWidth={1.5} />
              </div>
              <div className="dl-body">
                <h3 className="res-name">{it.name}</h3>
                <p className="res-desc">{it.desc}</p>
              </div>
              <a className="btn btn-ghost dl-btn" href={pdfUrl} download={it.file}>
                下载 {it.size}
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
