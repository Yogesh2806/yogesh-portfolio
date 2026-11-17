"use client";

import { useEffect, useState } from "react";

export default function Toc({ items, live }: { items: { id: string; name: string }[]; live?: [string, string] }) {
  const [on, setOn] = useState(items[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setOn(e.target.id); }); }, { rootMargin: "-35% 0px -60% 0px" });
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);
  return (
    <aside className="toc" aria-label="On this page">
      <span className="lab">On this page</span>
      {items.map((i) => <a key={i.id} href={`#${i.id}`} className={on === i.id ? "on" : undefined} dangerouslySetInnerHTML={{ __html: i.name }} />)}
      {live && <a className="btn btn-line" href={live[1]} target="_blank" rel="noreferrer" style={{ borderLeft: "1px solid var(--line)" }}>{live[0]}</a>}
    </aside>
  );
}
