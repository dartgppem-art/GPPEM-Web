import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a192f] text-white pt-12 pb-6 overflow-hidden border-t border-white/10">
      {/* Background com textura sutil de pontos claros */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` 
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 border-b border-white/20 pb-8">
          
          {/* Coluna 1: Identidade Institucional */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-lg inline-block">
                <img src="/logo-gppem.jpg" alt="GPPEM" className="h-10 w-auto object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter leading-none text-white">GPPEM</h2>
                <p className="text-blue-300 font-bold text-[10px] tracking-widest uppercase mt-1">Dart / Uern</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 font-medium leading-relaxed text-justify">
              Grupo de pesquisa perspectivas em educação musical. Dedicado à investigação e ao desenvolvimento da educação musical no cenário regional e nacional.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h3 className="text-white font-black mb-4 text-sm tracking-widest border-b border-white/20 pb-2 italic">
              Navegação
            </h3>
            <ul className="space-y-2 text-[14px] font-bold tracking-tighter">
              <li><Link to="/quem-somos" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">› Quem somos</Link></li>
              <li><Link to="/linhas-de-pesquisa" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">› Linhas de pesquisa</Link></li>
              <li><Link to="/publicacoes" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">› Publicações</Link></li>
              <li><Link to="/eventos" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">› Eventos</Link></li>
              <li><Link to="/acervo" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">› Acervo</Link></li>
              <li><Link to="/equipe" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">› Equipe</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div>
            <h3 className="text-white font-black mb-4 text-sm tracking-widest border-b border-white/20 pb-2 italic">
              Redes Sociais
            </h3>
            <div className="space-y-3">
              <p className="text-xs text-gray-400 mb-4">Siga-nos nas redes sociais e fique por dentro das novidades!</p>
              
              <div className="flex flex-col gap-2">
                <a 
                  href="https://www.instagram.com/gppem.dart/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-200 hover:text-pink-400 transition-all group"
                >
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-pink-400/20 transition-all">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">Instagram</span>
                </a>

                <a 
                  href="https://www.facebook.com/perspectivasemeducacaomusical" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-200 hover:text-blue-400 transition-all group"
                >
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-blue-400/20 transition-all">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">Facebook</span>
                </a>

                <a 
                  href="https://www.youtube.com/@gppemdart5762" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-200 hover:text-red-400 transition-all group"
                >
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-red-400/20 transition-all">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">YouTube</span>
                </a>

                <a 
                  href="https://www.linkedin.com/company/gppem" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-200 hover:text-blue-500 transition-all group"
                >
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h3 className="text-white font-black mb-4 text-sm tracking-widest border-b border-white/20 pb-2 italic">
              Contato
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-blue-300 text-lg">location_on</span>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">
                  Mossoró-RN, Campus Central, <br />
                  Av. Prof. Antônio Campos - Pres. Costa e Silva.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-300 text-lg">mail</span>
                <Link 
                  to="/contato" 
                  className="text-xs font-black text-white hover:text-blue-200 transition-all underline underline-offset-4"
                >
                  dart.gppem@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="flex flex-col items-center gap-6 text-[11px] font-medium tracking-wide text-gray-400 pt-4 border-t border-white/10">
          <p>© {currentYear} GPPEM DART/UERN. TODOS OS DIREITOS RESERVADOS.</p>
          
          {/* LOGOS CENTRALIZADAS */}
          <div className="flex items-center gap-6 bg-white/5 px-8 py-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <img src="/logo-dart-uern.png" alt="DART/UERN" className="h-12 object-contain brightness-125 grayscale hover:grayscale-0 transition-all opacity-90 hover:opacity-100" />
            <div className="w-px h-12 bg-white/20"></div>
            <img src="/logo-musica.jpg" alt="Música UERN" className="h-12 object-contain brightness-125 grayscale hover:grayscale-0 transition-all opacity-90 hover:opacity-100" />
            <div className="w-px h-12 bg-white/20"></div>
            <img src="/logo-gppem.jpg" alt="GPPEM" className="h-12 object-contain" />
          </div>
          
          {/* Informações de Desenvolvedor */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-between">
            <div className="text-center md:text-left">
              <p className="text-gray-400">Desenvolvido pelo GPPEM</p>
              <p className="text-gray-500 text-[10px] mt-0.5">Prof. Esp. José Igor Paulino da Silva</p>
            </div>
            <Link 
              to="/admin" 
              className="px-4 py-1.5 border border-white/30 rounded-full text-white hover:bg-white hover:text-[#0a192f] transition-all font-bold text-[10px]"
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