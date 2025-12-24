import { useState, useEffect } from "react";
import { Eye, EyeOff, Type, RotateCcw } from "lucide-react";

const AcessibilidadeTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  // Aplica o Zoom na fonte
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Aplica o Alto Contraste
  useEffect(() => {
    if (highContrast) {
      document.documentElement.style.filter = "contrast(120%) saturate(0%)";
      document.body.classList.add("high-contrast");
    } else {
      document.documentElement.style.filter = "none";
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  // Carrega as preferências salvas
  useEffect(() => {
    const savedFontSize = localStorage.getItem("acessibilidade-font-size");
    const savedContrast = localStorage.getItem("acessibilidade-high-contrast");
    
    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedContrast) setHighContrast(savedContrast === "true");
  }, []);

  // Salva as preferências
  useEffect(() => {
    localStorage.setItem("acessibilidade-font-size", String(fontSize));
    localStorage.setItem("acessibilidade-high-contrast", String(highContrast));
  }, [fontSize, highContrast]);

  return (
    <div className="fixed left-4 bottom-24 z-[9998] flex flex-col items-start gap-2">
      
      {/* Menu de Opções */}
      {isOpen && (
        <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col gap-3 animate-in slide-in-from-left-4 mb-2 w-56">
          <div className="flex items-center justify-center gap-2 pb-2 border-b border-gray-200">
            <Eye className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Acessibilidade
            </p>
          </div>
          
          {/* Controle de Fonte */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
              <Type className="w-4 h-4" />
              <span>Tamanho da Fonte</span>
            </div>
            <div className="flex justify-between gap-2">
              <button 
                onClick={() => setFontSize(s => Math.max(80, s - 10))}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg font-bold text-sm transition-colors"
                title="Diminuir Fonte"
                aria-label="Diminuir tamanho da fonte"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize(100)}
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1"
                title="Resetar Fonte"
                aria-label="Resetar tamanho da fonte"
              >
                <RotateCcw className="w-3 h-3" />
                {fontSize}%
              </button>
              <button 
                onClick={() => setFontSize(s => Math.min(150, s + 10))}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg font-bold text-sm transition-colors"
                title="Aumentar Fonte"
                aria-label="Aumentar tamanho da fonte"
              >
                A+
              </button>
            </div>
          </div>

          {/* Alto Contraste */}
          <button 
            onClick={() => setHighContrast(!highContrast)}
            className={`w-full py-2.5 px-3 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${
              highContrast 
                ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
                : 'bg-gray-900 text-white hover:bg-black'
            }`}
            aria-label={highContrast ? "Desativar alto contraste" : "Ativar alto contraste"}
          >
            {highContrast ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {highContrast ? "Desativar Contraste" : "Alto Contraste"}
          </button>
        </div>
      )}

      {/* Botão Principal */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
        title="Opções de Acessibilidade"
        aria-label="Abrir menu de acessibilidade"
        aria-expanded={isOpen}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-7 h-7" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="8" r="1"/>
          <path d="M12 12v.01"/>
          <path d="M12 16v.01"/>
          <path d="M8 12h.01"/>
          <path d="M16 12h.01"/>
        </svg>
      </button>

    </div>
  );
};

export default AcessibilidadeTools;