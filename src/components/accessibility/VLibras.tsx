import { useEffect } from 'react';

const VLibras = () => {
  useEffect(() => {
    // Evita carregar o script múltiplas vezes
    if (document.getElementById('vlibras-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'vlibras-script';
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    
    script.onload = () => {
      // @ts-ignore
      if (window.VLibras) {
        // @ts-ignore
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    
    script.onerror = () => {
      console.error('Erro ao carregar VLibras');
    };

    document.body.appendChild(script);

    return () => {
      const scriptElement = document.getElementById('vlibras-script');
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  return (
    <div 
      className="enabled" 
      style={{ 
        position: 'fixed', 
        right: '0', 
        top: '50%', 
        zIndex: 99999,
        pointerEvents: 'auto'
      }}
    >
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default VLibras;
