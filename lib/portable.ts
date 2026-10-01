import type { Body } from "./types";

// Turns a tiny Markdown subset into Portable Text so starter content in
// lib/content.ts renders exactly like content edited in Sanity.
//   ## Heading / ### Heading, "- " bullets, "> " quotes, [text](/link), **bold**
let n = 0;
const key = () => `k${(n++).toString(36)}`;

function spans(text: string) {
  const children: Record<string, unknown>[] = [];
  const markDefs: Record<string, unknown>[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) children.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] });
    if (m[1]) {
      const k = key();
      markDefs.push({ _type: "link", _key: k, href: m[2] });
      children.push({ _type: "span", _key: key(), text: m[1], marks: [k] });
    } else {
      children.push({ _type: "span", _key: key(), text: m[3], marks: ["strong"] });
    }
    last = re.lastIndex;
  }
  if (last < text.length) children.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  return { children, markDefs };
}

export function md(src: string): Body {
  return src
    .trim()
    .split(/\n\s*\n|\n(?=- |## |### |> )/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((line) => {
      let style = "normal";
      let listItem: string | undefined;
      let text = line.replace(/\s*\n\s*/g, " ");
      if (text.startsWith("### ")) [style, text] = ["h3", text.slice(4)];
      else if (text.startsWith("## ")) [style, text] = ["h2", text.slice(3)];
      else if (text.startsWith("> ")) [style, text] = ["blockquote", text.slice(2)];
      else if (text.startsWith("- ")) [listItem, text] = ["bullet", text.slice(2)];
      return {
        _type: "block",
        _key: key(),
        style,
        ...(listItem ? { listItem, level: 1 } : {}),
        ...spans(text),
      };
    }) as Body;
}

export function toPlainText(body: Body = []): string {
  return body
    .map((b) => ("children" in b && Array.isArray(b.children) ? b.children.map((c) => (typeof c.text === "string" ? c.text : "")).join("") : ""))
    .filter(Boolean)
    .join("\n\n");
}
