// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { FontaineTransform } from 'fontaine';

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
      page !== "https://hcks.dev/404/"
  }), mdx()],

  // this should fix lighthouse CLS fonts, but I'm too tired to set this up right now
  /* vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: {
          "Outfit": ["Helvetica", "Arial"],
          "JetBrains Mono": ["Roboto Mono"]
        }
      })
    ]
  } */
});