import { ghlConfig, sendLeadToGhl, type Lead } from "@/lib/ghl";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never see this field. Pretend it worked so bots move on.
  if (str(raw.website, 200)) {
    console.info("[lead] honeypot triggered, dropping submission");
    return Response.json({ ok: true });
  }

  const lead: Lead = {
    name: str(raw.name, 120),
    phone: str(raw.phone, 40),
    email: str(raw.email, 200).toLowerCase(),
    business: str(raw.business, 160),
    message: str(raw.message, 3000),
    page: str(raw.page, 200),
  };

  const errors: Record<string, string> = {};
  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (lead.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a phone number with area code.";
  if (!EMAIL_RE.test(lead.email)) errors.email = "Please enter a valid email address.";
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors, message: "Please check the highlighted fields." }, { status: 422 });
  }

  const cfg = ghlConfig();
  if (!cfg) {
    console.warn(
      "[lead] WARNING: GHL_API_KEY and/or GHL_LOCATION_ID are not set, so this lead was NOT sent to GoHighLevel. " +
        "Add both in Vercel > Project > Settings > Environment Variables. Lead details follow so it is not lost:",
      JSON.stringify(lead),
    );
    return Response.json({ ok: true, delivered: false });
  }

  try {
    await sendLeadToGhl(lead, cfg);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[lead] failed to send to GoHighLevel:", (err as Error).message, JSON.stringify(lead));
    return Response.json(
      { ok: false, message: "Sorry, something went wrong on our side. Please call us and we will help right away." },
      { status: 502 },
    );
  }
}
