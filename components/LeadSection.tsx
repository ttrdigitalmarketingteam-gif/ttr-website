import { telHref } from "@/lib/site";
import type { Settings } from "@/lib/types";
import { CheckIcon, PhoneIcon } from "./Icons";
import LeadForm from "./LeadForm";

export default function LeadSection({
  settings,
  heading = "Get your free marketing audit",
  text = "Tell us a little about your business. We will review your website, your Google presence and your competitors, then walk you through what to fix first.",
  id = "get-audit",
}: {
  settings: Settings;
  heading?: string;
  text?: string;
  id?: string;
}) {
  return (
    <section className="section section-tint" id={id} aria-labelledby={`${id}-title`}>
      <div className="container lead-grid">
        <div>
          <h2 id={`${id}-title`} className="section-title">{heading}</h2>
          <p className="lead">{text}</p>
          <ul className="checklist">
            <li><CheckIcon /> 30-minute strategy call</li>
            <li><CheckIcon /> In-depth marketing audit</li>
            <li><CheckIcon /> A clear growth roadmap</li>
          </ul>
          <p className="lead-call">
            Prefer to talk? <a href={telHref(settings.phoneE164)}><PhoneIcon /> {settings.phone}</a>
            <br />
            <span className="muted">{settings.hoursText}</span>
          </p>
        </div>
        <div className="card form-card">
          <LeadForm idPrefix={id} phone={settings.phone} phoneHref={telHref(settings.phoneE164)} />
        </div>
      </div>
    </section>
  );
}
