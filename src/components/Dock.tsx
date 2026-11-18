"use client";

import { Award, BarChart3, BriefcaseBusiness, CircleHelp, Headset, Home, Image as ImageIcon, PenTool, Shapes, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ITEMS = [
  { id: "home", icon: Home },
  { id: "about", icon: User },
  { id: "certifications", icon: Award },
  { id: "roles", icon: BriefcaseBusiness },
  { id: "services", icon: PenTool },
  { id: "projects", icon: ImageIcon },
  { id: "partners", icon: Shapes },
  { id: "testimonials", icon: BarChart3 },
  { id: "pricing", icon: CircleHelp },
  { id: "faq", icon: Headset },
] as const;

export default function Dock() {
  const t = useTranslations("dock");
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <ul className="flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-line bg-card/90 p-2 shadow-[0_6px_24px_rgba(0,0,0,0.1)] backdrop-blur">
        {ITEMS.map(({ id, icon: Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={t(id)}
              title={t(id)}
              aria-current={active === id ? "true" : undefined}
              className={`grid size-10 place-items-center rounded-xl transition-colors ${
                active === id ? "bg-accent text-white" : "text-muted hover:bg-line/60"
              }`}
            >
              <Icon className="size-5" strokeWidth={1.6} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
