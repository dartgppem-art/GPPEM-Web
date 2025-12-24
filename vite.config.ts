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
  build: {
    // Aumenta o limite para 1000kb (1MB) - isso remove o warning
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separa node_modules em chunks menores
          if (id.includes('node_modules')) {
            // React e relacionados
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Radix UI (componentes)
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            // Supabase
            if (id.includes('@supabase')) {
              return 'supabase';
            }
            // Tanstack Query
            if (id.includes('@tanstack')) {
              return 'tanstack';
            }
            // Lucide Icons
            if (id.includes('lucide-react')) {
              return 'lucide';
            }
            // Outros vendors
            return 'vendor';
          }
        },
      },
    },
    // Minificação agressiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
  },
}));