import { resolve } from "path";
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  envDir: resolve(__dirname, "..", ".."),
  plugins: [
    tsconfigPaths()
  ]
});
