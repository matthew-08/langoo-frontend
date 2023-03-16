import { defineConfig } from "vite";
// Remove project property from parserOptions
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
