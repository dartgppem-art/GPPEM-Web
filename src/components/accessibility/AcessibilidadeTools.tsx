import { useState, useEffect } from "react";

const AcessibilidadeTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100); // %
  const [highContrast, setHighContrast] = useState(false);

  // Aplica o Zoom na fonte
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Aplica o Alto Contraste (Filtro simples para não quebrar o layout)
  useEffect(() => {
    if (highContrast) {
      document.documentElement.style.filter = "contrast(120%) saturate(0%)";
      document.body.classList.add("high-contrast");
    } else {
      document.documentElement.style.filter = "none";
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  return (
    <div className="fixed left-4 bottom-24 z-[9999] flex flex-col items-start gap-2">
      
      {/* Menu de Opções (Abre ao clicar) */}
      {isOpen && (
        <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col gap-3 animate-in slide-in-from-left-4 mb-2 w-48">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Acessibilidade</p>
          
          <div className="flex justify-between gap-2">
            <button 
              onClick={() => setFontSize(s => Math.max(80, s - 10))}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg font-bold text-sm"
              title="Diminuir Fonte"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize(100)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg font-bold text-sm"
              title="Resetar"
            >
              100%
            </button>
            <button 
              onClick={() => setFontSize(s => Math.min(150, s + 10))}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg font-bold text-sm"
              title="Aumentar Fonte"
            >
              A+
            </button>
          </div>

          <button 
            onClick={() => setHighContrast(!highContrast)}
            className={`w-full py-2 px-3 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${highContrast ? 'bg-yellow-400 text-black' : 'bg-gray-900 text-white hover:bg-black'}`}
          >
            <span className="material-symbols-outlined text-sm">contrast</span>
            {highContrast ? "Desativar Contraste" : "Alto Contraste"}
          </button>
        </div>
      )}

      {/* Botão Principal */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
        title="Opções de Acessibilidade"
        aria-label="Abrir menu de acessibilidade"
      >
        <span className="material-symbols-outlined text-2xl">accessibility_new</span>
      </button>

    </div>
  );
};

export default AcessibilidadeTools;