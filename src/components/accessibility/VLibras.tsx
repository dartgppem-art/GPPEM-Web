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
        new window.VLibras.Widget({
          rootPath: 'https://vlibras.gov.br/app',
          opacity: 1,
          position: 'R', // Right (direita)
          avatar: 'icaro', // Avatar padrão
          // DESATIVA O TUTORIAL INICIAL
          personalization: {
            showTutorial: false
          }
        });

        // Remove o tutorial se ele aparecer
        setTimeout(() => {
          const tutorial = document.querySelector('[vw-tutorial]');
          const overlay = document.querySelector('.vw-plugin-overlay');
          if (tutorial) tutorial.remove();
          if (overlay) overlay.remove();
        }, 1000);
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