import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/hero/Hero";
import Dock from "@/components/Dock";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <Hero />
      <Dock />
      {/* Next sections (Story, About, Certifications, Roles, Services, Projects,
          Partners, Success Story, Testimonials, Pricing, FAQ, Footer) mount here. */}
    </main>
  );
}
