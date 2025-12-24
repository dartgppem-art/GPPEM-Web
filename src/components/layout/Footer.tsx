import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a192f] text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Barra inferior */}
        <div className="pt-6 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-[11px] font-medium tracking-wide text-gray-300">

            {/* Esquerda */}
            <div className="text-center md:text-left">
              <p>© {currentYear} GPPEM DART/UERN.</p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                TODOS OS DIREITOS RESERVADOS.
              </p>
            </div>

            {/* Centro - Logos */}
            <div className="flex justify-center items-center gap-8">
              <img
                src="/logo-dart-uern.png"
                alt="DART/UERN"
                className="h-10 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0"
              />
              <img
                src="/logo-musica.jpg"
                alt="Música UERN"
                className="h-10 object-contain opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0"
              />
              <img
                src="/logo-gppem.jpg"
                alt="GPPEM"
                className="h-10 object-contain opacity-70 hover:opacity-100 transition-all"
              />
            </div>

            {/* Direita */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-3 md:gap-6">
              <div className="text-center md:text-right">
                <p className="text-gray-300">Desenvolvido pelo GPPEM</p>
                <p className="text-gray-400 text-[10px] mt-0.5">
                  Prof. Esp. José Igor Paulino da Silva
                </p>
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
      </div>
    </footer>
  );
};

export default Footer;
