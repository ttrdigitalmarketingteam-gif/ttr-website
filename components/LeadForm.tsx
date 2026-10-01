"use client";

import { useState } from "react";

type Status = { state: "idle" | "sending" | "done" | "error"; message?: string };

export default function LeadForm({ idPrefix = "lead", phone, phoneHref }: { idPrefix?: string; phone: string; phoneHref: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        form.reset();
        setStatus({ state: "done" });
        return;
      }
      if (json.errors) setErrors(json.errors);
      setStatus({ state: "error", message: json.message || "Something went wrong. Please try again or give us a call." });
    } catch {
      setStatus({ state: "error", message: "We could not send your message. Please check your connection or give us a call." });
    }
  }

  if (status.state === "done") {
    return (
      <div className="form-thanks" role="status" aria-live="polite">
        <h3>Thank you! We got your message.</h3>
        <p>
          Someone from our team will reach out within one business day. Need us sooner? Call <a href={phoneHref}>{phone}</a>.
        </p>
      </div>
    );
  }

  const id = (n: string) => `${idPrefix}-${n}`;
  const field = (name: string, label: string, type: string, autoComplete: string, required = true) => (
    <div className="field">
      <label htmlFor={id(name)}>
        {label}
        {!required && <span className="optional"> (optional)</span>}
      </label>
      <input
        id={id(name)}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? id(`${name}-error`) : undefined}
      />
      {errors[name] && (
        <p className="field-error" id={id(`${name}-error`)}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <div className="field-grid">
        {field("name", "Name", "text", "name")}
        {field("phone", "Phone", "tel", "tel")}
        {field("email", "Email", "email", "email")}
        {field("business", "Business name", "text", "organization", false)}
      </div>
      <div className="field">
        <label htmlFor={id("message")}>
          How can we help?<span className="optional"> (optional)</span>
        </label>
        <textarea id={id("message")} name="message" rows={3} />
      </div>
      {/* Honeypot: hidden from people, bots tend to fill it in. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending..." : "Get my free audit"}
      </button>
      <p className="form-note">
        By sending this form you agree that we may call, text or email you about your request. Reply STOP to opt out of texts. See our{" "}
        <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms</a>.
      </p>
      <div aria-live="polite">{status.state === "error" && <p className="form-error">{status.message}</p>}</div>
    </form>
  );
}
