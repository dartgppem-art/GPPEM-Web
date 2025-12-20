import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12 text-center">
        <span className="material-symbols-outlined text-8xl text-muted-foreground mb-6">
          music_off
        </span>
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Página não encontrada
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined">home</span>
          <span>Voltar ao Início</span>
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotFound;
