import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (mode === "production") {
    return {
      base: "/madam3D/",
      plugins: [react(), Icons({ compiler: "jsx", jsx: "react" })],
    };
  }
  return {
    plugins: [react(), Icons({ compiler: "jsx", jsx: "react" })],
    server: {
      host: true,
      // https:true
    },
  };
});
