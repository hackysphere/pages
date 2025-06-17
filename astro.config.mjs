// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://hcks.dev/",

  i18n: {
      locales: ["en"],
      defaultLocale: "en"
  },

  integrations: [sitemap({
    filter: (page) =>
      page !== "https://hcks.dev/404/" &&
      page !== "https://hcks.dev/migrate/"
  })],
});