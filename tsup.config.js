import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.js', 'src/client.js'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  dts: false, // 👈 absolutely disable .d.ts generation
  splitting: false, // keep output simple
  clean: true, // clear dist/ before build
  banner: {
    js: '"use client";', // 👈 ensure the directive stays at top of client.js build
  },
});
