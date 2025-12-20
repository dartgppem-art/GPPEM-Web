import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/linhas-de-pesquisa", label: "Linhas de Pesquisa" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/eventos", label: "Eventos" },
  { href: "/equipe", label: "Equipe" },
  { href: "/contato", label: "Contato" },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-[300px] p-0 border-r border-border bg-background">
        <div className="flex flex-col h-full">
          
          {/* Header do Sidebar com a Nova Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 select-none">
              {/* Ícone Logo (Estilo CSS puro igual ao Header) */}
              <div className="relative w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                <span className="material-symbols-outlined text-blue-950 text-[22px] -rotate-6">
                  music_note
                </span>
              </div>
              
              {/* Texto Logo */}
              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-extrabold leading-none tracking-tight text-foreground">
                  GPPEM
                </h2>
                <span className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase leading-none mt-0.5">
                  UERN
                </span>
              </div>
            </div>
          </div>

          {/* Lista de Navegação */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer do Sidebar */}
          <div className="p-6 border-t border-border bg-muted/30">
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              &copy; 2024 GPPEM<br/>
              Universidade do Estado do Rio Grande do Norte
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;