import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";
import { manifest } from "./public/manifest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          "#2D264B": "currentColor",
        },
      },
    }),
    VitePWA(manifest),
  ],
});
