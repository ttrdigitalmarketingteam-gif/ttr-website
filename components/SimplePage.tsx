import Breadcrumbs from "@/components/Breadcrumbs";
import LeadSection from "@/components/LeadSection";
import PortableBody from "@/components/PortableBody";
import type { Page, Settings } from "@/lib/types";

export default function SimplePage({ page, settings, path, showLead = true }: { page: Page; settings: Settings; path: string; showLead?: boolean }) {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <Breadcrumbs items={[{ name: page.title, path }]} />
          <h1>{page.heading || page.title}</h1>
          {page.intro && <p className="lead">{page.intro}</p>}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container narrow">
          <PortableBody value={page.body} />
        </div>
      </section>
      {showLead && <LeadSection settings={settings} />}
    </>
  );
}
