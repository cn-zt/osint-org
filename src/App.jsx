import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Docs from "@/pages/Docs";
import DocPost from "@/pages/DocPost";
import Tools from "@/pages/Tools";
import ToolDetail from "@/pages/ToolDetail";
import Download from "@/pages/Download";
import About from "@/pages/About";

// 路由变化时滚动处理：带 hash 滚动到锚点，否则回顶部
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
      <Nav />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:group/:slug" element={<DocPost />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:group/:slug" element={<ToolDetail />} />
        <Route path="/download" element={<Download />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
