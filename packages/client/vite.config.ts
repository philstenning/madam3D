import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Icons from "unplugin-icons/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Icons({ compiler: "jsx", jsx: "react" })],
  base: "https://philstenning.github.io/madam3D/",
});
