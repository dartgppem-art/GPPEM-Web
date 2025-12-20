import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas principais
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import LinhasDePesquisa from "./pages/LinhasDePesquisa";
import Publicacoes from "./pages/Publicacoes";
import Eventos from "./pages/Eventos";
import Equipe from "./pages/Equipe";
import Contato from "./pages/Contato";

// PÁGINAS ADMINISTRATIVAS
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminEquipe from "./pages/admin/AdminEquipe"; // <--- Importação da nova página

// Novas páginas de eventos específicos
import EncontroDeEgressos from "./pages/EncontroDeEgressos";
import Femuern from "./pages/Femuern";

// Página 404
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/linhas-de-pesquisa" element={<LinhasDePesquisa />} />
          <Route path="/publicacoes" element={<Publicacoes />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/contato" element={<Contato />} />

          {/* ROTAS DE ADMINISTRAÇÃO */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Rota para Gerenciar Equipe */}
          <Route path="/admin/equipe" element={<AdminEquipe />} />

          {/* Subpáginas de Eventos */}
          <Route
            path="/eventos/encontro-de-egressos"
            element={<EncontroDeEgressos />}
          />
          <Route
            path="/eventos/femuern"
            element={<Femuern />}
          />

          {/* Rota 404 – sempre por último */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;