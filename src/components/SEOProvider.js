"use client";

import { DefaultSeo } from "next-seo";
import { defaultSeo } from "../lib/seo";

export default function SEOProvider() {
  return <DefaultSeo {...defaultSeo} />;
}
