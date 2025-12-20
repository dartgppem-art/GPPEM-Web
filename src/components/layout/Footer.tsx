import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="hidden lg:block bg-card border-t border-border py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-primary">GPPEM</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Grupo de Pesquisa Perspectivas em Educação Musical
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Universidade do Estado do Rio Grande do Norte (UERN)
              <br />
              Departamento de Artes - DART
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/quem-somos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/linhas-de-pesquisa" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Linhas de Pesquisa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/publicacoes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Publicações
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Equipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="material-symbols-outlined text-lg">location_on</span>
                Mossoró, RN - Brasil
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="material-symbols-outlined text-lg">mail</span>
                gppem@uern.br
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 GPPEM - UERN. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-2xl text-muted-foreground">school</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
