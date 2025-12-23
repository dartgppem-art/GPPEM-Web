import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/Layout/PageHero";
import { supabase } from "@/lib/supabase";
import heroEquipe from "@/assets/hero-music-education.jpg";

const Equipe = () => {
  const [membros, setMembros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipe = async () => {
      setLoading(true);
      // Busca todos os membros cadastrados no Admin
      const { data } = await supabase
        .from('membros')
        .select('*')
        .order('id', { ascending: true });
      setMembros(data || []);
      setLoading(false);
    };
    fetchEquipe();
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Equipe GPPEM"
        subtitle="Conheça os pesquisadores, colaboradores e discentes que constroem nossa trajetória."
        image={heroEquipe}
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-16">
          {loading ? (
            <div className="py-20 text-center animate-pulse text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Sincronizando corpo docente...</div>
          ) : (
            <>
              {/* SEÇÃO: PESQUISADORES */}
              <section className="space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="material-symbols-outlined text-primary">domino_mask</span>
                  <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Pesquisadores e Colaboradores</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {membros.map((membro) => (
                    <div key={membro.id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Foto de Perfil */}
                        <div className="w-24 h-24 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                          {membro.foto_url ? (
                            <img src={membro.foto_url} className="w-full h-full object-cover" alt={membro.nome} />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                              <span className="material-symbols-outlined text-4xl">person</span>
                            </div>
                          )}
                        </div>
                        {/* Informações e Biografia */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="text-lg font-black text-gray-800 leading-tight group-hover:text-primary transition-colors">{membro.nome}</h3>
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{membro.cargo}</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest italic">Dart / Uern</p>
                          </div>
                          
                          {/* Descrição/Biografia cadastrada no Admin */}
                          {membro.biografia && (
                            <p className="text-xs text-slate-500 font-medium leading-relaxed italic border-l-2 border-slate-100 pl-3">
                              "{membro.biografia}"
                            </p>
                          )}

                          {/* Botão para o Lattes cadastrado no Admin */}
                          {membro.lattes_url && (
                            <a 
                              href={membro.lattes_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:gap-4 transition-all"
                            >
                              Currículo Lattes <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Equipe;