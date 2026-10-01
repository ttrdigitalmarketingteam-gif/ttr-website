import Link from "next/link";
import { telHref } from "@/lib/site";
import type { Settings } from "@/lib/types";

export default function CtaBand({ settings, heading, text }: { settings: Settings; heading: string; text: string }) {
  return (
    <section className="cta-band">
      <div className="container">
        <h2>{heading}</h2>
        <p>{text}</p>
        <div className="btn-row">
          <Link href="/contact" className="btn btn-light">Get your free audit</Link>
          <a href={telHref(settings.phoneE164)} className="btn btn-ghost-light">Call {settings.phone}</a>
        </div>
      </div>
    </section>
  );
}
