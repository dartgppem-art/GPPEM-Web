import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/linhas-de-pesquisa", label: "Linhas de Pesquisa" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/eventos", label: "Eventos" },
  { href: "/equipe", label: "Equipe" },
  { href: "/contato", label: "Contato" },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Fecha a sidebar ao mudar de rota
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <>
      {/* HEADER CONFIGURATION:
        - sticky top-0: Fixa no topo.
        - bg-card/90: Fundo branco/claro com leve transparência (efeito vidro).
        - backdrop-blur-md: Desfoque do que passa por trás.
        - border-b: Linha sutil na parte inferior para separar do conteúdo.
      */}
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
        
        {/* LADO ESQUERDO: LOGO ANIMADA */}
        <Link to="/" className="flex items-center gap-3 group select-none">
            {/* Container do Ícone (Quadradinho Azul) */}
            <div className="relative w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-primary/90 overflow-hidden">
               {/* Efeito de brilho sutil no hover */}
               <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               
               {/* Ícone da Nota Musical */}
              <span className="material-symbols-outlined text-blue-950 text-[24px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 relative z-10">
                music_note
              </span>
            </div>

            {/* Texto Centralizado */}
            <div className="flex flex-col justify-center">
              <h1 className="text-lg font-extrabold leading-none tracking-tight text-primary">
                GPPEM
              </h1>
              <span className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase leading-none mt-0.5">
                UERN
              </span>
            </div>
        </Link>

        {/* CENTRO/DIREITA: MENU DESKTOP COMPLETO */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* LADO DIREITO: MENU MOBILE (HAMBÚRGUER) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors text-primary"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </header>

      {/* COMPONENTE SIDEBAR (Já criado anteriormente) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;