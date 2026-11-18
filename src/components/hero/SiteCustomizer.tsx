"use client";

import { useLocale, useTranslations } from "next-intl";
import { Panel } from "@/components/Panel";
import { ACCENTS, type Mode, useTheme } from "@/components/theme/ThemeProvider";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing } from "@/i18n/routing";

const selectClass =
  "rounded-md bg-transparent py-1 text-xs text-muted outline-offset-2 focus-visible:outline-2";

export default function SiteCustomizer() {
  const t = useTranslations("customizer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { accent, mode, setAccent, setMode } = useTheme();

  return (
    <Panel title={t("title")}>
      <div className="space-y-3 px-4 py-3">
        <p className="text-xs text-muted">{t("color")}</p>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t("color")}>
          {ACCENTS.map((c) => (
            <button
              key={c}
              role="radio"
              aria-checked={accent === c}
              aria-label={c}
              onClick={() => setAccent(c)}
              style={{ backgroundColor: c }}
              className={`size-6 rounded-md transition-transform hover:scale-110 ${
                accent === c ? "ring-2 ring-ink ring-offset-2 ring-offset-card" : ""
              }`}
            />
          ))}
          <label className="relative size-6 cursor-pointer overflow-hidden rounded-md" title={t("custom")}>
            <span className="absolute inset-0 bg-[conic-gradient(red,yellow,lime,aqua,blue,magenta,red)]" />
            <input
              type="color"
              aria-label={t("custom")}
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>
        </div>
      </div>
      <label className="flex items-center justify-between border-t border-line px-4 py-3 text-xs text-muted">
        {t("language")}
        <select
          className={selectClass}
          value={locale}
          onChange={(e) => router.replace(pathname, { locale: e.target.value as (typeof routing.locales)[number] })}
        >
          {routing.locales.map((l) => (
            <option key={l} value={l}>
              {localeNames[l]}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center justify-between border-t border-line px-4 py-3 text-xs text-muted">
        {t("mode")}
        <select className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          <option value="system">{t("system")}</option>
          <option value="light">{t("light")}</option>
          <option value="dark">{t("dark")}</option>
        </select>
      </label>
    </Panel>
  );
}
