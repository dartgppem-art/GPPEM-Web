import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import EventCard from "@/components/ui/EventCard";
import eventSeminar from "@/assets/event-seminar.jpg";

// Imagens genéricas ou específicas para os cards (reusando as existentes por enquanto)
import heroEducation from "@/assets/hero-music-education.jpg";

const events = [
  {
    title: "Seminário de Práticas Pedagógicas 2024",
    date: "24/10/2024",
    time: "14:00 - 18:00",
    location: "Auditório Central - UERN",
    description:
      "Encontro anual para discussão de metodologias inovadoras no ensino de música. Palestrantes convidados de diversas instituições do Nordeste.",
    imageUrl: eventSeminar,
    featured: true,
  },
  {
    title: "Workshop de Tecnologias Musicais",
    date: "15/Nov",
    time: "09:00 - 12:00",
    location: "Laboratório de Música - DART",
  },
  {
    title: "Roda de Conversa: Educação Musical na Primeira Infância",
    date: "22/Nov",
    time: "14:00 - 16:00",
    location: "Sala de Seminários - DART",
  },
  {
    title: "Apresentação de Pesquisas em Andamento",
    date: "05/Dez",
    time: "10:00 - 12:00",
    location: "Auditório do DART",
  },
  {
    title: "Encerramento das Atividades 2024",
    date: "12/Dez",
    time: "19:00",
    location: "Teatro Municipal",
  },
];

const Eventos = () => {
  return (
    <PageLayout>
      <PageHero
        title="Eventos"
        subtitle="Confira nossa agenda e projetos permanentes"
        image={eventSeminar}
      />

      <main className="px-4 pt-6 pb-8 space-y-8 max-w-3xl mx-auto">
        
        {/* SEÇÃO 1: Eventos Recorrentes (Novidade) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">campaign</span>
            <h2 className="text-lg font-bold text-foreground">Projetos Permanentes</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Encontro de Egressos */}
            <Link 
              to="/eventos/encontro-de-egressos"
              className="group relative overflow-hidden rounded-2xl border border-border shadow-sm hover:shadow-md transition-all h-[160px] flex items-end"
            >
              {/* Background Image com Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${heroEducation})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Conteúdo */}
              <div className="relative z-10 p-5 w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest bg-primary/80 px-2 py-0.5 rounded-full">
                    Bianual
                  </span>
                  <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    arrow_forward
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight mb-1">Encontro de Egressos</h3>
                <p className="text-xs text-white/70 line-clamp-1">
                  Fortalecendo laços e trocando experiências.
                </p>
              </div>
            </Link>

            {/* Card 2: FEMUERN */}
            <Link 
              to="/eventos/femuern"
              className="group relative overflow-hidden rounded-2xl border border-border shadow-sm hover:shadow-md transition-all h-[160px] flex items-end"
            >
              {/* Background Image com Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${heroEducation})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Conteúdo */}
              <div className="relative z-10 p-5 w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest bg-secondary/80 px-2 py-0.5 rounded-full">
                    Anual
                  </span>
                  <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    arrow_forward
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight mb-1">FEMUERN</h3>
                <p className="text-xs text-white/70 line-clamp-1">
                  Festival Escolar de Música da UERN.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* SEÇÃO 2: Destaque da Agenda */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">star</span>
            <h2 className="text-lg font-bold text-foreground">Destaque na Agenda</h2>
          </div>
          <EventCard {...events[0]} />
        </section>

        {/* SEÇÃO 3: Lista de Próximos Eventos */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              <h2 className="text-lg font-bold text-foreground">Próximos Eventos</h2>
            </div>
          </div>
          <div className="space-y-3">
            {events.slice(1).map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </section>

        {/* Calendar CTA */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-card-foreground text-sm mb-1">
                Fique por dentro
              </h3>
              <p className="text-xs text-muted-foreground">
                Receba notificações sobre novos eventos e atividades do GPPEM.
              </p>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:bg-primary/90 transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Eventos;