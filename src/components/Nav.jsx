import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/lib/theme";
import { site } from "@/lib/data";
import Icon from "@/lib/icons";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const items = [
    { key: "dark", title: "暗色", icon: "moon" },
    { key: "system", title: "跟随系统", icon: "monitor" },
    { key: "light", title: "亮色", icon: "sun" }
  ];
  return (
    <div className="theme-switch" role="group" aria-label="主题切换">
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          className="theme-btn"
          title={it.title}
          aria-pressed={theme === it.key}
          onClick={() => setTheme(it.key)}
        >
          <Icon name={it.icon} size={16} />
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/#top15", label: "Top15", hash: true },
    { to: "/tools", label: "工具" },
    { to: "/docs", label: "文档" },
    { to: "/download", label: "下载" },
    { to: "/about", label: "关于" }
  ];

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <div className="nav-capsule">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            <Icon name="radar" size={22} />
          </span>
          <span className="brand-text">{site.siteName}</span>
        </Link>

        <nav className="nav-links" aria-label="主导航">
          {links.map((l) =>
            l.hash ? (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ) : (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? "active" : undefined)}>
                {l.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="nav-actions">
          <ThemeSwitch />
          <a className="btn btn-ghost nav-cta" href={site.joinUrl} target="_blank" rel="noopener">
            加入频道
          </a>
        </div>

        <button
          className="nav-toggle"
          aria-label="展开菜单"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
