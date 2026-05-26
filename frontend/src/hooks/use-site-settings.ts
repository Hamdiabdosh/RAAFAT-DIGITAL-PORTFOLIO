import { useQuery } from "@tanstack/react-query";
import { siteSettingsQuery } from "@/lib/queries";
import { mergeSiteSettings, type SiteSettings } from "@/lib/site-settings";

export function useSiteSettings(): SiteSettings {
  const { data } = useQuery(siteSettingsQuery);
  return mergeSiteSettings(data);
}
