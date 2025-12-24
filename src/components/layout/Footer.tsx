import { Facebook, Instagram, Youtube, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// IMPORTANTE: Se o seu logo for uma imagem, importe ela aqui. 
// Exemplo: import logoGppem from '../assets/logo-gppem.png';

const Footer = () => {
  return (
    // ADICIONEI 'bg-slate-900' AQUI PARA VOLTAR A COR DE FUNDO ESCURA
    <footer className="w-full bg-slate-900 text-white py-12 border-t border-white/10 relative z-10">
      
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8 text-left">
          
          {/* --- COLUNA 1: IDENTIDADE --- */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
               {/* LOGO: Substitua pela imagem se tiver */}
               <div className="bg-white p-2 rounded-md h-16 w-auto flex items-center justify-center">
                  <span className="text-blue-900 font-bold text-xl px-2">LOGO GPPEM</span> 
               </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Grupo de Pesquisa Perspectivas em Educação Musical. Investigação e desenvolvimento da educação musical.
            </p>
          </div>

          {/* --- COLUNA 2: NAVEGAÇÃO --- */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-blue-400 inline-block pb-1">
              Navegação
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm font-medium">
              <li><Link to="/quem-somos" className="hover:text-blue-300 transition-colors">Quem Somos</Link></li>
              <li><Link to="/linhas-pesquisa" className="hover:text-blue-300 transition-colors">Linhas de Pesquisa</Link></li>
              <li><Link to="/publicacoes" className="hover:text-blue-300 transition-colors">Publicações</Link></li>
              <li><Link to="/eventos" className="hover:text-blue-300 transition-colors">Eventos</Link></li>
            </ul>
          </div>

          {/* --- COLUNA 3: CONECTE-SE (REDES SOCIAIS) --- */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-blue-400 inline-block pb-1">
              Conecte-se
            </h3>
            <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-300">Acompanhe nossas novidades:</p>
                <div className="flex gap-3">
                    {/* Instagram */}
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white text-white transition-all duration-300 border border-white/20">
                        <Instagram className="w-5 h-5" />
                    </a>
                    {/* Facebook */}
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white text-white transition-all duration-300 border border-white/20">
                        <Facebook className="w-5 h-5" />
                    </a>
                    {/* YouTube */}
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white text-white transition-all duration-300 border border-white/20">
                        <Youtube className="w-5 h-5" />
                    </a>
                </div>
            </div>
          </div>

          {/* --- COLUNA 4: CONTATO --- */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-blue-400 inline-block pb-1">
              Contato
            </h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                    <span className="block font-medium text-white">Campus Central - UERN</span>
                    <span className="block text-xs text-gray-400">Av. Prof. Antônio Campos, Mossoró-RN</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3 w-full overflow-hidden">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <a href="mailto:dart.gppem@gmail.com" className="hover:text-blue-300 transition-colors truncate">
                  dart.gppem@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Rodapé inferior (Copyright) */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p className="text-center md:text-left">© 2025 GPPEM DART/UERN. Todos os direitos reservados.</p>
          <div className="font-medium bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/30 text-blue-200">
             Desenvolvido com apoio DART
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;