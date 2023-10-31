import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { EsLinter, linterPlugin } from 'vite-plugin-linter';
import svgrPlugin from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          'jsx-control-statements',
        ],
      },
    }),
    tsConfigPaths(),
    svgrPlugin(),
    linterPlugin({
      include: ['./src/**/*.{ts,tsx}'],
      linters: [
        new EsLinter({
          configEnv: configEnv,
          serveOptions: { clearCacheOnStart: true },
        }),
      ],
    }),
  ],
  server: {
    open: '/',
    port: 3000,
  },
  preview: {
    port: 8080,
  },
}));
