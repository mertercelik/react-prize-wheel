import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  if (mode === 'demo') {
    return {
      plugins: [react()],
      base: '/react-prize-wheel/',
      build: {
        outDir: 'docs',
        emptyOutDir: true,
      },
    }
  }

  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        include: ['src'],
        exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'demo'],
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'ReactPrizeWheel',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      cssCodeSplit: false,
    },
  }
});
