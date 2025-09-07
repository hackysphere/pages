// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://hcks.dev/",

  i18n: {
      locales: ["en"],
      defaultLocale: "en"
  },

  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha"
    }
  },

  integrations: [sitemap({
    filter: (page) =>
      page !== "https://hcks.dev/404/" &&
      page !== "https://hcks.dev/migrate/"
  }), mdx()],
});