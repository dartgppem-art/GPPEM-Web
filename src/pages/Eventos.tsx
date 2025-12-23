import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import heroImage from "@/assets/event-seminar.jpg";
import femuernBg from "@/assets/hero-equipe.jpg";
import egressosBg from "@/assets/hero-equipe.jpg";

interface Evento {
  id: number;
  titulo: string;
  data_inicio: string;
  local: string;
  categoria: string;
  foto_url: string;
}

const Eventos = () => {
  const [listaEventos, setListaEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodosEventos();
  }, []);

  const fetchTodosEventos = async () => {
    setLoading(true);
    // FILTRO TÉCNICO: Buscamos apenas categoria 'geral' para a lista inferior
    // Isso evita que eventos do FEMUERN/Egressos apareçam duplicados abaixo dos cards fixos
    const { data, error } = await supabase
      .from('eventos')
      .select('id, titulo, data_inicio, local, categoria, foto_url')
      .eq('categoria', 'geral') 
      .order('id', { ascending: false });

    if (!error && data) {
      setListaEventos(data);
    }
    setLoading(false);
  };

  return (
    <PageLayout>
      <PageHero
        title="Eventos e Ações"
        subtitle="Confira nossa agenda, festivais e projetos de extensão."
        image={heroImage}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
        
        {/* SEÇÃO 1: PROJETOS PERMANENTES (ESTÁTICOS NO TOPO) */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary font-black">campaign</span>
            Projetos Permanentes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/egressos" className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0">
                <img src={egressosBg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Egressos" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80"></div>
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <span className="bg-primary/90 w-fit px-3 py-1 rounded-full text-[10px] font-bold text-white mb-3 uppercase tracking-widest">Encontro Bianual</span>
                <h3 className="text-2xl font-black text-white mb-2 italic uppercase">Encontro de Egressos</h3>
                <p className="text-white/80 text-sm font-medium">Fortalecendo laços e trocando experiências acadêmicas.</p>
              </div>
            </Link>

            <Link to="/femuern" className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0">
                <img src={femuernBg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="FEMUERN" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-80"></div>
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <span className="bg-blue-600/90 w-fit px-3 py-1 rounded-full text-[10px] font-bold text-white mb-3 uppercase tracking-widest">Festival Anual</span>
                <h3 className="text-2xl font-black text-white mb-2 italic uppercase">FEMUERN</h3>
                <p className="text-white/80 text-sm font-medium">Festival Escolar de Música da UERN - Protagonismo Juvenil.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* SEÇÃO 2: AGENDA DINÂMICA (APENAS CATEGORIA GERAL) */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary font-black">calendar_month</span>
              Agenda e Editais
            </h2>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Informativos Gerais</span>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-20 animate-pulse">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Sincronizando Agenda do Grupo...</span>
              </div>
            ) : listaEventos.length > 0 ? (
              listaEventos.map(evt => (
                <Link to={`/evento/${evt.id}`} key={evt.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-6 items-center group animate-slide-up">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-inner">
                    {evt.foto_url ? (
                      <img src={evt.foto_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Capa do Evento" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200"><span className="material-symbols-outlined text-3xl">image</span></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-0.5 rounded-full uppercase italic tracking-tighter">Categoria {evt.categoria}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors uppercase italic leading-tight">{evt.titulo}</h3>
                    <div className="flex flex-wrap gap-5 mt-3 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-primary">event</span> {evt.data_inicio}</span>
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-primary">location_on</span> {evt.local}</span>
                    </div>
                  </div>
                  <div className="text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-all">
                    <span className="material-symbols-outlined text-3xl">arrow_right_alt</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <span className="material-symbols-outlined text-5xl text-slate-200 mb-4 font-light">event_busy</span>
                <p className="text-gray-400 font-black italic uppercase text-[10px] tracking-widest">Nenhum edital ou evento geral disponível no momento.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Eventos;