import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // OTIMIZAÇÕES PARA REDUZIR O TAMANHO DOS CHUNKS
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa as bibliotecas React em um chunk próprio
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separa o Supabase em outro chunk
          'supabase': ['@supabase/supabase-js'],
          // Separa os componentes de UI
          'ui-components': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
        },
      },
    },
    // Aumenta o limite de warning para 1000kb
    chunkSizeWarningLimit: 1000,
    // Minifica o código com esbuild (não precisa instalar nada)
    minify: 'esbuild',
  },
}));