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
          // TODO: importもしつつ、astroに直接書いてもエラーにならないようにしたい（そもそもastro側の問題？）
          // additionalData: `
          //   @use "${path.resolve(__dirname, "src")}/styles/global/global.scss" as *;
          //   @use "sass:map";
          // `,
        },
      },
    },
  },
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }), // NOTE: autoprefixerも合わせて適用される
    image(),
  ],
});
