import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/ukPostcode.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
});
