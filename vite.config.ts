import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    proxy: {
      "/mms": {
        target: "https://api.qaym.one",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mms/, "fsh-mms"),
      },
    },
  },
});
