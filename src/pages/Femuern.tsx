import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/Layout/PageHero";
import heroEventos from "@/assets/hero-music-education.jpg";

const Femuern = () => {
  return (
    <PageLayout>
      <PageHero
        title="FEMUERN"
        subtitle="Festival Escolar de Música da Universidade do Estado do Rio Grande do Norte"
        image={heroEventos}
      />

      <main className="px-4 pt-6 pb-8 space-y-6 max-w-3xl mx-auto animate-fade-in">
        {/* Intro Text */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-6">
          <p className="text-muted-foreground leading-relaxed">
            O <span className="font-semibold text-primary">FEMUERN – Festival Escolar de Música da UERN</span> – é uma iniciativa que
            busca incentivar a prática musical no contexto escolar, promovendo a
            integração entre escola, universidade e comunidade.
          </p>
        </div>

        {/* Edições List */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">music_note</span>
            <h2 className="text-lg font-bold text-foreground">Edições Realizadas</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["2019", "2021", "2023"].map((year) => (
              <div key={year} className="flex flex-col items-center justify-center p-4 bg-card hover:shadow-md transition-all rounded-xl border border-border text-center gap-2 group">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Edição</span>
                <span className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">{year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Card - Future Feature */}
        <div className="mt-6 p-6 border border-dashed border-border rounded-xl bg-muted/20 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-muted-foreground">add_circle</span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">Gerenciar Edições</h3>
            <p className="text-xs text-muted-foreground">
              Funcionalidade de cadastro e upload de fotos das edições em desenvolvimento.
            </p>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Femuern;