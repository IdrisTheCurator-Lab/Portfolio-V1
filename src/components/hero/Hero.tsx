"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { type FormEvent } from "react";
import { Panel } from "@/components/Panel";
import SiteCustomizer from "./SiteCustomizer";

const STATS = [
  ["certifications", "11"],
  ["experience", "4+"],
  ["tools", "10"],
  ["brands", "15"],
  ["projects", "18"],
] as const;

const DOCS = ["resume", "cases", "catalogues", "gallery"] as const;
const NAV = ["home", "projects", "playground", "contact"] as const;

export default function Hero() {
  const t = useTranslations();
  const reduce = useReducedMotion();

  // One orchestrated moment: headline lines rise in, everything else stays still.
  const rise = (i: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const } };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to your email/contact service (Resend, Formspree, etc.)
  }

  return (
    <section id="home" className="relative mx-auto min-h-dvh max-w-[1440px] px-6 pb-32 pt-6 lg:px-10">
      <header className="flex items-center justify-between gap-4">
        <a href="#home" className="text-xl font-bold tracking-tight sm:text-2xl">
          {t("brand")}
        </a>
        <nav aria-label="Primary" className="hidden rounded-xl border border-line bg-card p-1 shadow-sm md:block">
          <ul className="flex text-sm">
            {NAV.map((key, i) => (
              <li key={key}>
                <a
                  href={key === "home" ? "#home" : `#${key === "projects" ? "projects" : key}`}
                  className={`block rounded-lg px-3 py-1.5 ${i === 0 ? "bg-accent text-white" : "text-muted hover:text-ink"}`}
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mt-6 grid gap-6 lg:block">
        <p className="max-w-xs text-sm text-muted lg:absolute lg:left-10 lg:top-24 lg:ml-[68px]">{t("status")}</p>

        <div className="order-first lg:absolute lg:right-10 lg:top-[100px] lg:w-60">
          <SiteCustomizer />
        </div>

        <div className="flex flex-col items-center px-2 text-center lg:pt-24">
          <motion.span {...rise(0)} className="rounded-full bg-card px-5 py-2.5 text-sm font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            {t("hero.badge")}
          </motion.span>
          <h1 className="mt-10 text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tight [text-wrap:balance]">
            <motion.span {...rise(1)} className="block text-accent">
              {t("hero.line1")}
            </motion.span>
            <motion.span {...rise(2)} className="block">
              {t("hero.line2")}
            </motion.span>
          </h1>
          <p className="mt-8 max-w-[640px] text-sm leading-relaxed text-muted sm:text-base">
            {t.rich("hero.intro", {
              tula: (c) => <b className="text-[#0a7bea]">{c}</b>,
              kasoowa: (c) => <b className="text-[#22b24c]">{c}</b>,
              ease: (c) => <b className="text-[#ff8a1f]">{c}</b>,
              ulodge: (c) => <b>{c}</b>,
            })}
          </p>
          <form onSubmit={onSubmit} className="mt-10 flex w-full max-w-[500px] items-center gap-3">
            <input
              type="text"
              required
              placeholder={t("hero.placeholder")}
              aria-label={t("hero.placeholder")}
              className="h-12 min-w-0 flex-1 rounded-full border border-line bg-card px-5 text-sm shadow-sm placeholder:text-muted/70"
            />
            <button
              type="submit"
              className="flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white shadow-md transition-transform active:scale-95"
            >
              {t("hero.send")}
              <ArrowUpRight className="size-4" />
            </button>
          </form>
        </div>

        <Panel title={t("about.title")} className="lg:absolute lg:bottom-28 lg:left-10 lg:w-72">
          <dl>
            {STATS.map(([key, value]) => (
              <div key={key} className="flex items-center justify-between border-b border-line px-4 py-2.5 text-xs text-muted last:border-b-0">
                <dt>{t(`about.${key}`)}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title={t("docs.title")} className="lg:absolute lg:bottom-28 lg:right-10 lg:w-60">
          <ul>
            {DOCS.map((key) => (
              <li key={key} className="border-b border-line last:border-b-0">
                <a href="#" className="block px-4 py-2.5 text-xs text-muted hover:text-ink">
                  {t(`docs.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </section>
  );
}
