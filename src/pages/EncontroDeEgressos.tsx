import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/Layout/PageHero";
import heroEventos from "@/assets/hero-music-education.jpg";

const EncontroDeEgressos = () => {
  return (
    <PageLayout>
      <PageHero
        title="Encontro de Egressos"
        subtitle="Evento bianual do Curso de Música da UERN, promovido pelo GPPEM desde 2018"
        image={heroEventos}
      />

      <main className="px-4 pt-6 pb-8 space-y-6 max-w-3xl mx-auto animate-fade-in">
        {/* Intro Text */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-6">
          <p className="text-muted-foreground leading-relaxed">
            O <span className="font-semibold text-primary">Encontro de Egressos do Curso de Música da UERN</span> é um evento realizado
            bianualmente com o objetivo de promover o diálogo entre egressos,
            estudantes e docentes, fortalecendo a formação profissional e a
            reflexão sobre a prática pedagógica em música.
          </p>
        </div>

        {/* Edições List */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">history</span>
            <h2 className="text-lg font-bold text-foreground">Histórico de Edições</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["2018", "2020", "2022", "2024"].map((year) => (
              <div key={year} className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border hover:bg-muted transition-colors">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-medium text-foreground">Encontro de Egressos {year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Card - Future Feature */}
        <div className="mt-6 p-6 border border-dashed border-border rounded-xl bg-muted/20 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-muted-foreground">edit_calendar</span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">Cadastrar nova edição</h3>
            <p className="text-xs text-muted-foreground">
              Em breve será possível cadastrar novas edições e anais do evento através do painel administrativo.
            </p>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default EncontroDeEgressos;