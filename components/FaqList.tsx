import { faqLd } from "@/lib/jsonld";
import type { Faq } from "@/lib/types";
import JsonLd from "./JsonLd";

export default function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: Faq[]; heading?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container narrow">
        <h2 id="faq-title" className="section-title">{heading}</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqLd(faqs)} />
    </section>
  );
}
