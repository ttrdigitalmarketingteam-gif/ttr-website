import Link from "next/link";
import { telHref } from "@/lib/site";
import type { Settings } from "@/lib/types";
import { PhoneIcon } from "./Icons";

export default function StickyCall({ settings }: { settings: Settings }) {
  return (
    <div className="sticky-call" role="region" aria-label="Quick contact">
      <a href={telHref(settings.phoneE164)} className="btn btn-primary">
        <PhoneIcon /> Call now
      </a>
      <Link href="/contact" className="btn btn-outline">
        Free audit
      </Link>
    </div>
  );
}
