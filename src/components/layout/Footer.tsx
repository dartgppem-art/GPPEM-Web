import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // CLASSE RESTAURADA: bg-[#0a192f] (Azul Escuro) e w-full (Largura Total)
    <footer className="relative bg-[#0a192f] text-white pt-16 pb-8 overflow-hidden border-t border-white/10 w-full">
      
      {/* Textura de Fundo Sutil */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` 
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* GRID PRINCIPAL: Responsivo (1 coluna no mobile -> 4 no PC) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-white/20 pb-12">
          
          {/* Coluna 1: Identidade */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-lg inline-block">
                <img src="/logo-gppem.jpg" alt="GPPEM" className="h-10 w-auto object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter leading-none text-white">GPPEM</h2>
                <p className="text-blue-400 font-bold text-[10px] tracking-widest uppercase mt-1">DART / UERN</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 font-medium leading-relaxed text-justify">
              Grupo de Pesquisa Perspectivas em Educação Musical. Investigação e desenvolvimento da educação musical no cenário regional e nacional.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h3 className="text-white font-black mb-6 text-sm tracking-widest border-b border-white/20 pb-2 italic">
              Navegação
            </h3>
            <ul className="space-y-3 text-[13px] font-bold tracking-tighter uppercase">
              <li><Link to="/quem-somos" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">› Quem somos</Link></li>
              <li><Link to="/linhas-de-pesquisa" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">› Linhas de pesquisa</Link></li>
              <li><Link to="/publicacoes" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">› Publicações</Link></li>
              <li><Link to="/eventos" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">› Eventos</Link></li>
              <li><Link to="/acervo" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">› Acervo</Link></li>
              <li><Link to="/equipe" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">› Equipe</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h3 className="text-white font-black mb-6 text-sm tracking-widest border-b border-white/20 pb-2 italic">
              Contato
            </h3>
            <div className="space-y-5">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-blue-400 text-lg">location_on</span>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">
                  Mossoró-RN, Campus Central, <br />
                  Av. Prof. Antônio Campos.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-400 text-lg">mail</span>
                <a 
                  href="mailto:dart.gppem@gmail.com" 
                  className="text-xs font-black text-white hover:text-blue-200 transition-all underline underline-offset-4"
                >
                  dart.gppem@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 4: Redes Sociais e Acesso */}
          <div>
            <h3 className="text-white font-black mb-6 text-sm tracking-widest border-b border-white/20 pb-2 italic">
              Conecte-se
            </h3>
            <div className="flex gap-4 mb-6">
              {/* Ícones sociais placeholder - podem ser ativados via Admin */}
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"><span className="material-symbols-outlined text-sm">share</span></div>
            </div>
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-white hover:bg-white hover:text-[#0a192f] transition-all font-bold text-[10px] uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-sm">lock</span> Acesso Restrito
            </Link>
          </div>
        </div>

        {/* ÁREA DAS LOGOS (Rodapé Inferior) */}
        <div className="flex flex-col items-center justify-center gap-8 pt-8 pb-4">
          {/* Logos lado a lado */}
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
             <img src="/logo-dart-uern.png" alt="DART UERN" className="h-12 object-contain brightness-0 invert" />
             <div className="h-8 w-[1px] bg-white/30"></div>
             <img src="/logo-gppem.jpg" alt="GPPEM" className="h-10 object-contain rounded-md" />
             <div className="h-8 w-[1px] bg-white/30"></div>
             <img src="/logo-musica.jpg" alt="Musica" className="h-10 object-contain rounded-md opacity-80" />
          </div>

          <p className="text-[9px] font-medium tracking-widest text-gray-500 uppercase text-center">
            © {currentYear} GPPEM DART/UERN. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;