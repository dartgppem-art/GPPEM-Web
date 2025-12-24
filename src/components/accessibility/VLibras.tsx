import { useEffect } from 'react';

const VLibras = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    // Estrutura exigida pelo plugin do Governo
    <div className="enabled">
      <div vw="true" className="left-0 top-1/2 transform -translate-y-1/2">
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default VLibras;