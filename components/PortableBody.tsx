import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Body } from "@/lib/types";

type ImgValue = { url?: string; alt?: string; caption?: string; width?: number; height?: number };

const components: PortableTextComponents = {
  types: {
    altImage: ({ value }: { value: ImgValue }) =>
      value?.url ? (
        <figure>
          <Image
            src={value.url}
            alt={value.alt || ""}
            width={value.width || 1200}
            height={value.height || 675}
            sizes="(max-width: 760px) 100vw, 720px"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href || "#";
      return href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href} rel="noopener" target="_blank">{children}</a>;
    },
  },
};

export default function PortableBody({ value }: { value: Body }) {
  if (!value?.length) return null;
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  );
}
