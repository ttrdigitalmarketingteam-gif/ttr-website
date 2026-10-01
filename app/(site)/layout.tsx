import "../globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import StickyCall from "@/components/StickyCall";
import { getServices, getSettings } from "@/lib/data";
import { siteGraph } from "@/lib/jsonld";

export const revalidate = 300;

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  return (
    <>
      <Header settings={settings} />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} />
      <StickyCall settings={settings} />
      <JsonLd data={siteGraph(settings)} />
    </>
  );
}
