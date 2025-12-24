import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a192f] text-white pt-12 pb-6 overflow-hidden border-t border-white/10">
      {/* Background textura */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* ===== COLUNAS SUPERIORES (INALTERADAS) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 border-b border-white/20 pb-8">
          {/* Coluna 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <img src="/logo-gppem.jpg" alt="GPPEM" className="h-10 w-auto" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase">GPPEM</h2>
                <p className="text-blue-300 text-[10px] font-bold tracking-widest uppercase">
                  DART / UERN
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed text-justify">
              Grupo de Pesquisa Perspectivas em Educação Musical, dedicado à
              investigação e ao desenvolvimento da educação musical.
            </p>
          </div>

          {/* Coluna 2 */}
          <div>
            <h3 className="font-black text-sm tracking-widest border-b border-white/20 pb-2 italic mb-4">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm font-bold">
              {[
                ["Quem somos", "/quem-somos"],
                ["Linhas de pesquisa", "/linhas-de-pesquisa"],
                ["Publicações", "/publicacoes"],
                ["Eventos", "/eventos"],
                ["Acervo", "/acervo"],
                ["Equipe", "/equipe"],
              ].map(([label, link]) => (
                <li key={link}>
                  <Link
                    to={link}
                    className="hover:text-blue-300 transition-colors"
                  >
                    › {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 */}
          <div>
            <h3 className="font-black text-sm tracking-widest border-b border-white/20 pb-2 italic mb-4">
              Redes Sociais
            </h3>
            <div className="space-y-3">
              {[
                ["Instagram", Instagram, "https://www.instagram.com/gppem.dart/"],
                ["Facebook", Facebook, "https://www.facebook.com/perspectivasemeducacaomusical"],
                ["YouTube", Youtube, "https://www.youtube.com/@gppemdart5762"],
                ["LinkedIn", Linkedin, "https://www.linkedin.com/company/gppem"],
              ].map(([label, Icon, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-blue-300 transition"
                >
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 4 */}
          <div>
            <h3 className="font-black text-sm tracking-widest border-b border-white/20 pb-2 italic mb-4">
              Contato
            </h3>
            <div className="space-y-4 text-xs text-gray-300">
              <p>
                Mossoró-RN, Campus Central <br />
                Av. Prof. Antônio Campos
              </p>
              <Link
                to="/contato"
                className="underline font-bold hover:text-blue-300"
              >
                dart.gppem@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* ===== BARRA INFERIOR COM LOGOS CENTRALIZADAS ===== */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-[11px] text-gray-400">
          {/* Esquerda */}
          <div className="text-center lg:text-left">
            <p>© {currentYear} GPPEM DART/UERN.</p>
            <p className="text-[10px] text-gray-500">
              TODOS OS DIREITOS RESERVADOS.
            </p>
          </div>

          {/* LOGOS CENTRALIZADAS */}
          <div className="flex items-center gap-8">
            <img
              src="/logo-dart-uern.png"
              alt="DART/UERN"
              className="h-9 opacity-70 hover:opacity-100 transition grayscale hover:grayscale-0"
            />
            <img
              src="/logo-musica.jpg"
              alt="Música UERN"
              className="h-9 opacity-70 hover:opacity-100 transition grayscale hover:grayscale-0"
            />
            <img
              src="/logo-gppem.jpg"
              alt="GPPEM"
              className="h-9 opacity-80 hover:opacity-100 transition"
            />
          </div>

          {/* Direita */}
          <div className="flex flex-col items-center lg:items-end gap-2">
            <div className="text-center lg:text-right">
              <p>Desenvolvido pelo GPPEM</p>
              <p className="text-[10px] text-gray-500">
                Prof. Esp. José Igor Paulino da Silva
              </p>
            </div>
            <Link
              to="/admin"
              className="px-4 py-1.5 border border-white/30 rounded-full hover:bg-white hover:text-[#0a192f] transition font-bold text-[10px]"
            >
              Acesso restrito
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
