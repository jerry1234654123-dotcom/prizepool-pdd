// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/activity_prize/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/activity_prize/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import minipic from "file:///D:/activity_prize/node_modules/vite-plugin-minipic/dist/index.mjs";
import pxtovw from "file:///D:/activity_prize/node_modules/postcss-px-to-viewport/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/activity_prize/vite.config.js";
var loder_pxtovw = pxtovw({
  //这里是设计稿宽度 自己修改
  viewportWidth: 375,
  viewportUnit: "vw"
});
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    minipic({})
  ],
  pages: {
    index: {
      title: "test"
    }
  },
  css: {
    postcss: {
      plugins: [loder_pxtovw]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "/dev": {
        target: "https://api.gujilunpanguanglihoutaiyinni.life",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, "/api/activity/prizePool")
      },
      "/kf": {
        target: "https://api.gujilunpanguanglihoutaiyinni.life",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kf/, "/api/sys/dict")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxhY3Rpdml0eV9wcml6ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYWN0aXZpdHlfcHJpemVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2FjdGl2aXR5X3ByaXplL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHtmaWxlVVJMVG9QYXRoLCBVUkx9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IG1pbmlwaWMgZnJvbSAndml0ZS1wbHVnaW4tbWluaXBpYydcbmltcG9ydCBweHRvdncgZnJvbSAncG9zdGNzcy1weC10by12aWV3cG9ydCdcblxuY29uc3QgbG9kZXJfcHh0b3Z3ID0gcHh0b3Z3KHtcbi8vXHU4RkQ5XHU5MUNDXHU2NjJGXHU4QkJFXHU4QkExXHU3QTNGXHU1QkJEXHU1RUE2IFx1ODFFQVx1NURGMVx1NEZFRVx1NjUzOVxuICAgIHZpZXdwb3J0V2lkdGg6IDM3NSxcbiAgICB2aWV3cG9ydFVuaXQ6ICd2dydcbn0pXG5cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoKSxcbiAgICAgICAgbWluaXBpYyh7XG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICBdLFxuICAgIHBhZ2VzOiB7XG4gICAgICAgIGluZGV4OiB7XG4gICAgICAgICAgICB0aXRsZTogJ3Rlc3QnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgICBwb3N0Y3NzOiB7XG4gICAgICAgICAgICBwbHVnaW5zOiBbbG9kZXJfcHh0b3Z3XVxuICAgICAgICB9XG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICcvZGV2Jzoge1xuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYXBpLmd1amlsdW5wYW5ndWFuZ2xpaG91dGFpeWlubmkubGlmZScsXG4gICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9kZXYvLCAnL2FwaS9hY3Rpdml0eS9wcml6ZVBvb2wnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICcva2YnOiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9hcGkuZ3VqaWx1bnBhbmd1YW5nbGlob3V0YWl5aW5uaS5saWZlJyxcbiAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2tmLywgJy9hcGkvc3lzL2RpY3QnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU8sU0FBUSxlQUFlLFdBQVU7QUFFMVEsU0FBUSxvQkFBbUI7QUFDM0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFlBQVk7QUFMMEgsSUFBTSwyQ0FBMkM7QUFPOUwsSUFBTSxlQUFlLE9BQU87QUFBQTtBQUFBLEVBRXhCLGVBQWU7QUFBQSxFQUNmLGNBQWM7QUFDbEIsQ0FBQztBQUlELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLFFBQVEsQ0FFUixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsT0FBTztBQUFBLE1BQ0gsT0FBTztBQUFBLElBQ1g7QUFBQSxFQUNKO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxTQUFTO0FBQUEsTUFDTCxTQUFTLENBQUMsWUFBWTtBQUFBLElBQzFCO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE9BQU87QUFBQSxNQUNILFFBQVE7QUFBQSxRQUNKLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLHlCQUF5QjtBQUFBLE1BQ3ZFO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDSCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsU0FBUyxlQUFlO0FBQUEsTUFDNUQ7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
