import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 用户名主页仓库默认 base 为 "/" 即可
export default defineConfig({
    plugins: [react()],
    base: "/"
});
