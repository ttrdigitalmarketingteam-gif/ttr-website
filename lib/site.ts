// Business facts used across the site, JSON-LD and llms.txt.
// Sanity "Site settings" can override most of these at runtime.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ttrdigitalmarketing.com").replace(/\/$/, "");

export const site = {
  name: "TTR Digital Marketing",
  legalName: "TTR Digital Marketing Inc.",
  shortName: "TTR Digital",
  tagline: "Digital marketing that turns searches into calls",
  description:
    "TTR Digital Marketing is a Miami digital marketing agency. We help local businesses, dental practices and home service companies get found on Google and in AI answers, then turn that attention into calls and booked jobs.",
  phone: "(786) 460-1311",
  phoneE164: "+17864601311",
  email: "ttrdigitalmarketingteam@gmail.com",
  foundingYear: "2015",
  address: {
    street: "1000 Brickell Ave Ste 715",
    city: "Miami",
    region: "FL",
    postalCode: "33131",
    country: "US",
  },
  geo: { lat: 25.7646, lng: -80.1918 },
  hours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" }],
  hoursText: "Monday to Friday, 9 AM to 5 PM",
  areaServed: ["Miami", "Miami-Dade County", "Broward County", "South Florida", "United States"],
  social: [
    { name: "Facebook", url: "https://www.facebook.com/TTRDigitalMarketing" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/ttr-digital-marketing/" },
    { name: "Instagram", url: "https://www.instagram.com/ttrdigitalmarketing/" },
    { name: "X (Twitter)", url: "https://twitter.com/ttrdigital" },
  ],
} as const;

export type Site = typeof site;

export const telHref = (e164: string) => `tel:${e164}`;
export const addressLine = (a: Site["address"]) => `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;
