import { defineConfig } from "astro/config";
import autoprefixer from "autoprefixer";

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
      postcss: {
        plugins: [autoprefixer],
      },
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
});
