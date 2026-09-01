import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="brand-text">{site.siteName}</span>
        <div className="footer-grid">
          <div className="footer-col">
            <section className="footer-block">
              <h3 className="footer-title">社区宗旨</h3>
              <p>{site.motto}</p>
            </section>
            <section className="footer-block">
              <h3 className="footer-title">免责声明</h3>
              <p>{site.disclaimer}</p>
            </section>
          </div>
          <div className="footer-ai">
            <div className="footer-ai-col">
              <h3 className="footer-title">国内 AI 服务商</h3>
              <ul className="footer-ai-list">
                {site.aiProviders.domestic.map((p) => (
                  <li key={p.name}>
                    <a
                      className="footer-ai-item"
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={p.name}
                    >
                      <img src={p.icon} alt={p.name} loading="lazy" />
                      <span>{p.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-ai-col">
              <h3 className="footer-title">国外 AI 服务商</h3>
              <ul className="footer-ai-list">
                {site.aiProviders.overseas.map((p) => (
                  <li key={p.name}>
                    <a
                      className="footer-ai-item"
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={p.name}
                    >
                      <img src={p.icon} alt={p.name} loading="lazy" />
                      <span>{p.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-divider" />
        <p className="footer-bottom">{site.copyright}</p>
      </div>
    </footer>
  );
}
