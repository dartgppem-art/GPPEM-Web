import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuickAccessCard from "@/components/ui/QuickAccessCard";
import ActivityItem from "@/components/ui/ActivityItem";
import heroImage from "@/assets/hero-music-education.jpg";
import activityArticle from "@/assets/activity-article.jpg";
import eventSeminar from "@/assets/event-seminar.jpg";

const researchAreas = [
  "Educação Musical a Distância",
  "Educação Musical Mediada por Tecnologias",
  "Educação Musical Online e Híbrida",
  "Ensino e Aprendizagem da Música",
];

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="px-4 py-6 w-full">
        <div className="relative w-full h-[340px] lg:h-[420px] rounded-2xl overflow-hidden shadow-xl group bg-primary-dark">
          
          {/* Background Image com Zoom Hover */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-overlay"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          {/* AJUSTE DE GRADIENTE:
             Mudamos para um gradiente angular vindo do topo-esquerdo (to-br),
             igual ao PageHero. Isso escurece o canto onde o texto fica.
          */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/60 to-transparent" />
          
          {/* AJUSTE DE POSICIONAMENTO:
             1. Removido 'bottom-0' e 'flex-end'.
             2. Adicionado 'top-0' e 'pt-10' (padding top) para fixar o texto no alto.
          */}
          <div className="absolute top-0 left-0 right-0 p-6 pt-10 lg:p-10 flex flex-col items-start text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-wider bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
              Grupo de Pesquisa
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold leading-tight mb-3 tracking-tight">
              Perspectivas em Educação Musical
            </h2>
            <p className="text-primary-foreground/80 text-sm lg:text-base max-w-[95%] lg:max-w-2xl leading-relaxed line-clamp-2 mb-6 font-light">
              Investigação e reflexão crítica sobre o ensino da música na contemporaneidade e suas práticas.
            </p>
            <Link
              to="/quem-somos"
              className="flex items-center gap-2 text-sm font-bold bg-primary-foreground text-primary px-6 py-3 rounded-full hover:bg-accent transition-all shadow-lg active:scale-95"
            >
              <span>Conheça o Grupo</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Research Areas - Horizontal Scroll */}
      <div className="flex flex-col gap-3 pt-2 pb-6">
        <div className="flex items-center justify-between px-6">
          <h3 className="text-lg font-bold tracking-tight text-foreground">Áreas de Pesquisa</h3>
        </div>
        <div className="flex overflow-x-auto gap-3 px-6 pb-2 hide-scrollbar snap-x">
          {researchAreas.map((area, index) => (
            <button
              key={area}
              className={`snap-start shrink-0 flex items-center px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                index === 0
                  ? "bg-primary text-primary-foreground shadow-md border border-transparent"
                  : "bg-card border border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="px-4 py-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAccessCard
          href="/linhas-de-pesquisa"
          icon="biotech"
          bgIcon="science"
          title="Pesquisas"
          subtitle="12 Projetos Ativos"
        />
        <QuickAccessCard
          href="/publicacoes"
          icon="menu_book"
          bgIcon="library_books"
          title="Publicações"
          subtitle="Acervo Digital"
        />
        <QuickAccessCard
          href="/eventos"
          icon="event"
          bgIcon="calendar_month"
          title="Eventos"
          subtitle="Próximo: 24/Out"
        />
        <QuickAccessCard
          href="/equipe"
          icon="groups"
          bgIcon="groups"
          title="Membros"
          subtitle="Equipe Docente"
        />
      </div>

      {/* Recent Activity */}
      <div className="px-4 py-6">
        <div className="flex flex-col bg-card rounded-2xl p-6 border border-border shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              <h3 className="font-bold text-base text-card-foreground">Atividade Recente</h3>
            </div>
            <Link
              to="/publicacoes"
              className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              Ver tudo <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Link>
          </div>
          <ActivityItem
            type="Novo Artigo"
            title="A importância da música na primeira infância"
            subtitle="Há 2 horas • Prof. Silva"
            imageUrl={activityArticle}
          />
          <ActivityItem
            type="Evento"
            title="Seminário de Práticas Pedagógicas 2024"
            subtitle="Próxima semana"
            imageUrl={eventSeminar}
          />
        </div>
      </div>

      {/* Footer Mark - Mobile */}
      <div className="flex flex-col items-center justify-center pb-10 pt-4 gap-2 opacity-40 lg:hidden">
        <span className="material-symbols-outlined text-2xl text-primary">school</span>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">UERN • 2024</span>
      </div>
    </PageLayout>
  );
};

export default Index;