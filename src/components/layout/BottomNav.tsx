import { Link, useLocation } from "react-router-dom";

const navItems = [
  { href: "/", icon: "home", label: "Início" },
  { href: "/quem-somos", icon: "info", label: "Sobre" },
  { href: "/linhas-de-pesquisa", icon: "school", label: "Pesquisa" },
  { href: "/equipe", icon: "groups", label: "Equipe" },
  { href: "/contato", icon: "mail", label: "Contato" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-card border-t border-border nav-shadow px-2 py-2 flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl transition-transform ${
                  isActive ? "material-symbols-filled scale-110" : ""
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
