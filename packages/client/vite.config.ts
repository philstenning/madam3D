import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Icons from "unplugin-icons/vite";
import remarkHtml from "vite-remark-html";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Icons({ compiler: "jsx", jsx: "react" }), remarkHtml()],
});
