import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Comando para resetar o scroll para o topo toda vez que a rota mudar
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;