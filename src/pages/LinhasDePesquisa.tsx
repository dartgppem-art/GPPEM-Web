import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import ResearchLineCard from "@/components/ui/ResearchLineCard";
import { supabase } from "@/lib/supabase";
import heroPesquisa from "@/assets/hero-pesquisa.jpg";

const LinhasDePesquisa = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [linhas, setLinhas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // BUSCA DINÂMICA: Conectando ao que você cadastra no Admin
  useEffect(() => {
    const fetchLinhas = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('linhas_pesquisa')
        .select('*')
        .order('id', { ascending: true });
      
      if (!error && data) {
        setLinhas(data);
      }
      setLoading(false);
    };
    fetchLinhas();
  }, []);

  // FILTRO: Permite buscar nas linhas cadastradas
  const filteredLines = linhas.filter((line) =>
    (line.titulo || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (line.descricao || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <PageHero
        title="Linhas de Pesquisa"
        subtitle="Explore as vertentes investigativas e produções acadêmicas do GPPEM."
        image={heroPesquisa}
      />

      <div className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-5 py-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-muted-foreground">search</span>
            <input
              type="text"
              placeholder="Buscar por tema ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-none rounded-2xl bg-muted text-foreground placeholder-muted-foreground shadow-sm focus:ring-2 focus:ring-primary focus:bg-card transition-all text-sm"
            />
          </div>
        </div>
      </div>

      <main className="p-5 space-y-6 max-w-3xl mx-auto pb-20">
        <div className="space-y-2">
          <h2 className="text-xl font-black text-foreground uppercase italic tracking-tighter flex items-center gap-2">
            <span className="w-1.5 h-5 bg-primary rounded-full"></span>
            Eixos Acadêmicos
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            Listagem dinâmica das áreas de estudo do grupo vinculadas ao DART/UERN.
          </p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="py-20 text-center animate-pulse">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Sincronizando banco de dados...</p>
            </div>
          ) : filteredLines.length > 0 ? (
            filteredLines.map((line) => (
              <ResearchLineCard
                key={line.id}
                icon="hub" // Ícone padrão acadêmico
                title={line.titulo}
                description={line.descricao}
              />
            ))
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
              <span className="material-symbols-outlined text-4xl text-slate-200 mb-2">inventory_2</span>
              <p className="text-slate-400 font-black italic uppercase text-[10px] tracking-widest">
                {searchQuery ? "Nenhum resultado para a busca" : "Aguardando cadastro no painel administrativo"}
              </p>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default LinhasDePesquisa;