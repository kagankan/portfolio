import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "always",
  vite: {
    server: {
      open: true,
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "assets/[name].[hash].js",
          entryFileNames: "assets/[name].[hash].js",
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "src/styles/global/global.scss" as *;
            @use "sass:map";
          `,
        },
      },
    },
  },
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }), // NOTE: autoprefixerも合わせて適用される
    image(),
  ],
});
