import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import viteImagemin from "vite-plugin-imagemin";
import pxtovw from "postcss-px-to-viewport";
import mkcert from "vite-plugin-mkcert";

const loder_pxtovw = pxtovw({
  //这里是设计稿宽度 自己修改
  viewportWidth: 375,
  viewportUnit: "vw",
});

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue(),
    mkcert(),
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 3,
    //     interlaced: false,
    //   },
    //   optipng: {
    //     optimizationLevel: 3,
    //   },
    //   mozjpeg: {
    //     quality: 50,
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 10,
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: "removeViewBox",
    //       },
    //       {
    //         name: "removeEmptyAttrs",
    //         active: false,
    //       },
    //     ],
    //   },
    // }),
  ],
  pages: {
    index: {
      title: "test",
    },
  },
  css: {
    postcss: {
      plugins: [loder_pxtovw],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    https: true,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: 'https://api-asia-jakarta.gujilunpanguanglihoutaiyinni.life',
        changeOrigin: true,
      },
    },
  },
});
