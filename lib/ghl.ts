// GoHighLevel (LeadConnector) API v2. Keys come from the environment only.
const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

export type Lead = { name: string; phone: string; email: string; business?: string; message?: string; page?: string };

export function ghlConfig() {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  return apiKey && locationId ? { apiKey, locationId } : null;
}

async function ghl(path: string, apiKey: string, body: unknown) {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`GoHighLevel ${path} failed: ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

export async function sendLeadToGhl(lead: Lead, cfg: { apiKey: string; locationId: string }) {
  const [firstName, ...rest] = lead.name.trim().split(/\s+/);
  const upsert = await ghl("/contacts/upsert", cfg.apiKey, {
    locationId: cfg.locationId,
    firstName,
    lastName: rest.join(" ") || undefined,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    companyName: lead.business || undefined,
    source: "Website form",
  });
  const contactId: string | undefined = upsert?.contact?.id;
  if (!contactId) throw new Error("GoHighLevel upsert returned no contact id");

  // Add the tag separately so existing tags on a returning contact are kept.
  await ghl(`/contacts/${contactId}/tags`, cfg.apiKey, { tags: ["website-lead"] });

  const note = [
    "New website lead",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    lead.business ? `Business: ${lead.business}` : null,
    lead.page ? `Page: ${lead.page}` : null,
    "",
    `Message: ${lead.message || "(no message)"}`,
  ]
    .filter((l) => l !== null)
    .join("\n");
  await ghl(`/contacts/${contactId}/notes`, cfg.apiKey, { body: note });
  return contactId;
}
