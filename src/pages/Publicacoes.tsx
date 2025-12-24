import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import { supabase } from "@/lib/supabase";
import heroPublicacoes from "@/assets/event-seminar.jpg";

const Publicacoes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [obras, setObras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicacoes = async () => {
      setLoading(true);
      // Busca todas as produções cadastradas na aba Produções do Admin
      const { data, error } = await supabase
        .from('publicacoes')
        .select('*')
        .order('id', { ascending: false });
      
      if (!error && data) {
        setObras(data);
      }
      setLoading(false);
    };
    fetchPublicacoes();
  }, []);

  // Motor de Filtro: Busca por título, autores ou descrição
  const filteredObras = obras.filter((obra) =>
    (obra.titulo || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (obra.autores || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (obra.descricao || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <PageHero
        title="Publicações e Produções"
        subtitle="Acesse a produção bibliográfica e técnica dos pesquisadores do GPPEM."
        image={heroPublicacoes}
      />

      {/* BARRA DE PESQUISA DINÂMICA */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="xl:max-w-7xl mx-auto px-5 py-6">
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input
              type="text"
              placeholder="Pesquisar por título, autor ou tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 xl:max-w-7xl pb-32">
        <div className="space-y-6">
          {loading ? (
            <div className="py-20 text-center animate-pulse">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] italic">Sincronizando repositório...</p>
            </div>
          ) : filteredObras.length > 0 ? (
            filteredObras.map((obra) => (
              <div key={obra.id} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">menu_book</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">{obra.ano || 'Publicação'}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 uppercase italic leading-tight group-hover:text-primary transition-colors">
                      {obra.titulo}
                    </h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                      Autores: <span className="text-slate-600">{obra.autores}</span>
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3">
                      {obra.descricao}
                    </p>
                    {obra.link_url && (
                      <a 
                        href={obra.link_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:gap-4 transition-all pt-4"
                      >
                        Acessar Obra Completa <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
               <span className="material-symbols-outlined text-5xl text-slate-200 mb-4">find_in_page</span>
               <p className="text-gray-400 font-black italic uppercase text-[10px] tracking-widest">Nenhuma publicação encontrada no momento.</p>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default Publicacoes;