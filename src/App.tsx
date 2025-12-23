import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORT DO COMPONENTE DE RESET DE SCROLL
import ScrollToTop from "./components/ScrollToTop";

// Páginas principais
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import LinhasDePesquisa from "./pages/LinhasDePesquisa";
import Publicacoes from "./pages/Publicacoes";
import Eventos from "./pages/Eventos";
import Equipe from "./pages/Equipe";
import Contato from "./pages/Contato";
import Galeria from "./pages/Galeria";

// PÁGINAS ADMINISTRATIVAS E SEGURANÇA
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminEventos from "./pages/AdminEventos";
import RotaProtegida from "./components/RotaProtegida";

// Novas páginas de eventos específicos e detalhes
import EncontroDeEgressos from "./pages/EncontroDeEgressos";
import Femuern from "./pages/Femuern";
import EventoDetalhes from "./pages/EventoDetalhes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* O ScrollToTop deve ficar aqui, dentro do BrowserRouter mas fora das Routes */}
        <ScrollToTop /> 
        
        <Routes>
          {/* Rotas Públicas Principais */}
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/linhas-de-pesquisa" element={<LinhasDePesquisa />} />
          <Route path="/publicacoes" element={<Publicacoes />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/acervo" element={<Galeria />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/contato" element={<Contato />} />

          {/* Rota de Login */}
          <Route path="/login" element={<Login />} />

          {/* Subpáginas de Eventos e Redirecionamentos */}
          <Route path="/eventos/encontro-de-egressos" element={<EncontroDeEgressos />} />
          <Route path="/egressos" element={<EncontroDeEgressos />} />
          <Route path="/eventos/femuern" element={<Femuern />} />
          <Route path="/femuern" element={<Femuern />} />

          {/* Rota Dinâmica para Detalhes de Evento */}
          <Route path="/evento/:id" element={<EventoDetalhes />} />

          {/* --- ÁREA RESTRITA (BLINDADA 🔐) --- */}
          <Route element={<RotaProtegida />}>
             <Route path="/admin" element={<Admin />} />
             <Route path="/admin/eventos" element={<AdminEventos />} />
          </Route>

          {/* Rota de Erro 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;