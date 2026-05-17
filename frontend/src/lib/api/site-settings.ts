import { SiteSettings } from "@/lib/types";
import { strapiGetOne, API } from "./strapi";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await strapiGetOne<SiteSettings>(API.SITE_SETTINGS, {
      populate: "*",
    });
    return settings || {};
  } catch {
    return {};
  }
}
