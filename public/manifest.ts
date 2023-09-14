import { VitePWAOptions } from "vite-plugin-pwa";

export const manifest: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "BatShu",
    short_name: "BatShu",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/appIcon.png",
        type: "image/png",
        sizes: "323x323",
      },
    ],
  },
};
