import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/Layout/PageHero";
import { supabase } from "@/lib/supabase";
import heroImage from "@/assets/hero-music-education.jpg";

const Galeria = () => {
  const [eventosComFotos, setEventosComFotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarAcervo = async () => {
      setLoading(true);
      // 1. Busca eventos e fotos de forma independente para evitar bloqueios de RLS
      const { data: eventos } = await supabase.from('eventos').select('id, titulo, categoria, foto_url').order('id', { ascending: false });
      const { data: fotos } = await supabase.from('galeria_eventos').select('evento_id');

      if (eventos && fotos) {
        const formatados = eventos.map(ev => ({
          ...ev,
          total_fotos: fotos.filter(f => f.evento_id === ev.id).length
        })).filter(ev => ev.total_fotos > 0);
        setEventosComFotos(formatados);
      }
      setLoading(false);
    };
    carregarAcervo();
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Acervo Fotográfico"
        subtitle="Memória Institucional GPPEM DART/UERN"
        image={heroImage}
      />

      <div className="px-5 py-8 max-w-4xl mx-auto min-h-[400px]">
        {/* INFORMAÇÃO DE INTERAÇÃO NO TOPO */}
        <div className="bg-blue-50 border-l-4 border-primary p-4 mb-10 rounded-r-xl animate-fade-in">
          <p className="text-primary font-black text-xs uppercase italic tracking-tighter">
            💡 Clique no evento para ver as fotos do acervo completo.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse font-black text-primary text-[10px] uppercase">Sincronizando Memórias...</div>
        ) : eventosComFotos.length > 0 ? (
          /* GRID VERTICAL COMPACTO - ESTILO CARTAZ */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {eventosComFotos.map((evento) => (
              <Link 
                to={`/evento/${evento.id}`} 
                key={evento.id} 
                className="group flex flex-col bg-white rounded-2xl shadow-card border border-border overflow-hidden hover:scale-105 transition-all duration-300"
              >
                {/* Banner do Cartaz (Vertical) */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img src={evento.foto_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={evento.titulo} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                     <span className="text-[7px] font-black bg-primary text-white px-2 py-0.5 rounded-full uppercase mb-1 inline-block">
                        {evento.categoria}
                     </span>
                  </div>
                </div>

                {/* Nome e Link Clicável */}
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <h3 className="text-[11px] font-bold text-foreground uppercase italic line-clamp-2 leading-tight mb-2">
                    {evento.titulo}
                  </h3>
                  <div className="border-t border-border pt-2">
                    <p className="text-primary font-black text-[9px] uppercase tracking-tighter flex items-center justify-between">
                      FOTOS DO EVENTO 
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </p>
                    <p className="text-[8px] text-muted-foreground italic font-bold mt-1">
                      {evento.total_fotos} registros
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-30 italic uppercase font-black text-xs">Nenhum álbum disponível.</div>
        )}
      </div>
    </PageLayout>
  );
};

export default Galeria;