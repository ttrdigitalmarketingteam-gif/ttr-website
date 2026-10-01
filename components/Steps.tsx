import type { Step } from "@/lib/types";

export default function Steps({ steps, numbered = true }: { steps: Step[]; numbered?: boolean }) {
  return (
    <ol className={`steps${numbered ? "" : " steps-plain"}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="card">
          {numbered && <span className="step-num" aria-hidden="true">{i + 1}</span>}
          <h3>{s.title}</h3>
          {s.text && <p>{s.text}</p>}
        </li>
      ))}
    </ol>
  );
}
