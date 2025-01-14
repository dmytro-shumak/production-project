import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr({ svgrOptions: { jsxRuntime: "classic" } }), react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host: true,
    port: 3000,
  },
  define: {
    __DEV__: JSON.stringify(true),
    __PROJECT__: JSON.stringify("frontend"),
  },
});
