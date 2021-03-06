import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import optimizationPersist from 'vite-plugin-optimize-persist';
import pkgConfig from 'vite-plugin-package-config';
import svgr from '@honkhonk/vite-plugin-svgr';
import autoImport from 'unplugin-auto-import/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import vitApp from '@vitjs/vit';
import windiCSS from 'vite-plugin-windicss';

import routes from './config/routes';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy'],
        },
      },
    }),
    svgr(),
    autoImport({
      imports: [
        'react',
        {
          react: ['createElement', 'cloneElement', 'createContext'],
        },
      ],
    }),
    tsconfigPaths(),
    pkgConfig(),
    optimizationPersist(),
    vitApp({
      routes,
      dynamicImport: {
        loading: './components/PageLoading',
      },
      exportStatic: {},
      mock: { productionEnabled: true },
    }),
    windiCSS(),
    visualizer(),
  ],
  server: {
    // open: true,
    port: 8000,
  },
  resolve: {
    alias: [
      // { find: '@', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
      { find: /^~/, replacement: '' },
    ],
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-venders': ['react', 'react-dom', '@vitjs/runtime'],
        },
      },
    },
  },
});
