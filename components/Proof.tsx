import Image from "next/image";
import type { Logo, Stat, Testimonial } from "@/lib/types";

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <dl className="stats">
      {stats.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="testimonials">
      {items.map((t) => (
        <figure key={t.quote} className="card testimonial">
          <blockquote>
            <p>&ldquo;{t.quote}&rdquo;</p>
          </blockquote>
          <figcaption>
            {t.name && <strong>{t.name}</strong>}
            {[t.role, t.company].filter(Boolean).join(", ")}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function LogoStrip({ logos, label }: { logos: Logo[]; label: string }) {
  if (!logos.length) return null;
  return (
    <div className="logo-strip">
      <p className="logo-label">{label}</p>
      <ul>
        {logos.map((l) => {
          const h = 44;
          const w = Math.round((l.width / l.height) * h) || 100;
          const img = <Image src={l.src} alt={l.name} width={w} height={h} sizes={`${w}px`} />;
          return <li key={l.name}>{l.url ? <a href={l.url} rel="noopener" target="_blank">{img}</a> : img}</li>;
        })}
      </ul>
    </div>
  );
}
