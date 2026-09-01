import { useEffect, useState } from "react";
import { slugify } from "@/components/Markdown";

export function extractToc(body) {
  const items = [];
  const re = /^(#{2,3})\s+(.+)$/gm;
  let m;
  while ((m = re.exec(body))) {
    const text = m[2].replace(/[*_`~]/g, "").trim();
    items.push({ level: m[1].length, text, id: slugify(text) });
  }
  return items;
}

export default function Toc({ items }) {
  const [active, setActive] = useState("");

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!items.length || !("IntersectionObserver" in window)) return;
    const heads = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  if (!items.length) return null;
  return (
    <aside className="post-toc">
      <span className="toc-title">目录</span>
      <nav>
        {items.map((it) => (
          <a
            key={it.id + it.text}
            href={`#${it.id}`}
            className={active === it.id ? "active" : undefined}
            style={it.level === 3 ? { paddingLeft: 32 } : undefined}
            onClick={(e) => handleClick(e, it.id)}
          >
            {it.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
