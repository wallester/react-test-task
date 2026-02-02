// rsbuild.config.ts
import path from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

const resolvePath = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],

  source: {
    // If your entry is different (e.g. src/main.tsx) adjust here.
    entry: {
      index: resolvePath('./src/main.tsx'),
    },
  },

  resolve: {
    alias: {
      '@': resolvePath('./src'),
      '@shared': resolvePath('./src/shared'),
      '@pages': resolvePath('./src/pages'),
    },
  },

  html: {
    title: 'Recipes Explorer',
  },

  output: {
    // Optional, but makes builds predictable
    distPath: {
      root: resolvePath('./dist'),
    },
    cleanDistPath: true,
  },

  server: {
    port: 3000,
    // Important for React Router v5 in SPA mode:
    // ensures direct navigation to /recipes/123 works in dev.
    historyApiFallback: true,
    open: false,
  },

  tools: {
    // Rsbuild will also load postcss.config.* automatically if present.
    // This hook lets you enforce/extend plugins without relying on external config.
    postcss: (opts) => {
      opts.postcssOptions ??= {};
      opts.postcssOptions.plugins ??= [];

      // Example (uncomment if you have these deps):
      // opts.postcssOptions.plugins.push(require('autoprefixer'));
      // opts.postcssOptions.plugins.push(require('postcss-nested'));
    },

    // Optional: small Rspack tweaks if needed later.
    // Prefer "tools.bundlerChain" for advanced changes.
    rspack: {
      // Example: add defines, fallbacks, etc.
    },
  },
});
