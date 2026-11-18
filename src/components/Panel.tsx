import type { ReactNode } from "react";

export function Panel({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`overflow-hidden rounded-xl border border-line bg-card shadow-[0_2px_10px_rgba(0,0,0,0.06)] ${className}`}>
      <h2 className="border-b border-line px-4 py-3 text-sm font-medium text-muted">{title}</h2>
      {children}
    </section>
  );
}
