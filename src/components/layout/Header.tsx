import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/linhas-de-pesquisa", label: "Linhas de Pesquisa" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/eventos", label: "Eventos" },
  { href: "/acervo", label: "Acervo" },
  { href: "/equipe", label: "Equipe" },
  { href: "/contato", label: "Contato" },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
        
        {/* LADO ESQUERDO: IDENTIDADE VISUAL GPPEM COMPLETA */}
        <Link to="/" className="flex items-center gap-4 group select-none flex-1 lg:flex-none">
            {/* ÍCONE: NOTA MUSICAL EM BRANCO */}
            <div className="relative w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-primary/90 overflow-hidden shrink-0">
               <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="material-symbols-outlined text-white text-[28px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 relative z-10">
                music_note
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* BLOCO CENTRALIZADO: SIGLA + DEPARTAMENTO */}
              <div className="flex flex-col items-center justify-center min-w-[70px]">
                <h1 className="text-xl font-black leading-none tracking-tighter text-primary uppercase">
                  GPPEM
                </h1>
                <span className="text-[8px] font-bold text-muted-foreground tracking-[0.2em] uppercase leading-none mt-1.5">
                  DART / UERN
                </span>
              </div>

              {/* TRAÇO VERTICAL DIVISOR */}
              <div className="h-10 w-[1.5px] bg-slate-200 hidden md:block"></div>

              {/* NOME POR EXTENSO: INICIAIS MAIÚSCULAS E FONTE MAIOR */}
              <div className="hidden md:flex flex-col justify-center">
                <span className="text-[11.5px] font-semibold leading-[1.3] text-slate-500 max-w-[210px]">
                  Grupo de Pesquisa Perspectivas em Educação Musical
                </span>
              </div>
            </div>
        </Link>

        {/* MENU DESKTOP */}
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

        {/* MENU MOBILE */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors text-primary"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;