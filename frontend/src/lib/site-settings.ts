export type SiteSettings = Record<string, string>;

export const SITE_SETTING_DEFAULTS: SiteSettings = {
  site_name: "RAAFAT-DIGITAL",
  tagline: "We Digitalize Everything",
  contact_email: "hello@raafat.digital",
  whatsapp_number: "+251000000000",
  telegram_handle: "@raafatdigital",
  instagram_url: "",
  linkedin_url: "",
  address: "Harar, Ethiopia",
  office_hours: "Mon–Fri, 9:00 AM – 6:00 PM EAT",
};

export function mergeSiteSettings(data?: SiteSettings | null): SiteSettings {
  return { ...SITE_SETTING_DEFAULTS, ...data };
}

export function whatsappLink(number: string): string {
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "#";
}

export function telegramLink(handle: string): string {
  const user = handle.replace(/^@/, "").trim();
  return user ? `https://t.me/${user}` : "#";
}
