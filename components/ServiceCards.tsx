import Link from "next/link";
import type { Service } from "@/lib/types";
import { ArrowIcon } from "./Icons";

export default function ServiceCards({ services, headingLevel = 3 }: { services: Service[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="cards">
      {services.map((s) => (
        <li key={s.slug} className="card card-link">
          <H>
            <Link href={`/services/${s.slug}`}>{s.title}</Link>
          </H>
          <p>{s.summary}</p>
          <span className="card-more" aria-hidden="true">
            Learn more <ArrowIcon />
          </span>
        </li>
      ))}
    </ul>
  );
}
