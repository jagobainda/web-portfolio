import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://jagoba.dev",
    output: "static",
    adapter: node({
        mode: "standalone",
    }),
    integrations: [
        sitemap({
            i18n: {
                defaultLocale: "es",
                locales: {
                    es: "es-ES",
                    en: "en-US",
                },
            },
            filter: page => !page.endsWith("/404/"),
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
    i18n: {
        defaultLocale: "es",
        locales: ["es", "en"],
        routing: {
            prefixDefaultLocale: false,
        },
    },
});
