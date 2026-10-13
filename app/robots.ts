import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/insights", "/api"] }, sitemap: `${profile.seo.siteUrl}/sitemap.xml` };
}
