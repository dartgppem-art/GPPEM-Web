import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const EventosDestaque = () => {
  const [destaques, setDestaques] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestaques = async () => {
      const hoje = new Date().toISOString().split('T')[0];
      
      const { data } = await supabase
        .from('eventos')
        .select('id, titulo, data_inicio, local, categoria, foto_url')
        .gte('data_inicio', hoje) // Pega apenas eventos de hoje em diante
        .order('data_inicio', { ascending: true }) // O mais próximo primeiro
        .limit(3);

      setDestaques(data || []);
      setLoading(false);
    };
    fetchDestaques();
  }, []);

  if (loading || destaques.length === 0) return null;

  return (
    <section className=\"py-12 bg-slate-50\">
      <div className=\"container mx-auto px-4 max-w-5xl\">
        <div className=\"flex items-center justify-between mb-8\">
          <div>
            <h2 className=\"text-2xl font-black text-gray-900 uppercase italic tracking-tighter\">Radar GPPEM</h2>
            <p className=\"text-[10px] text-primary font-bold uppercase tracking-[0.3em]\">Próximas Atividades</p>
          </div>
          <Link to=\"/eventos\" className=\"text-[10px] font-black text-gray-400 uppercase hover:text-primary transition-colors flex items-center gap-2\">
            Ver Agenda Completa <span className=\"material-symbols-outlined text-xs\">arrow_forward</span>
          </Link>
        </div>

        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
          {destaques.map((evt) => (
            <Link to={`/evento/${evt.id}`} key={evt.id} className=\"group bg-white rounded-2xl shadow-card border border-border p-4 hover:scale-[1.03] transition-all duration-300\">
              <div className=\"aspect-video rounded-xl overflow-hidden mb-4\">
                <img src={evt.foto_url} className=\"w-full h-full object-cover group-hover:scale-110 transition-duration-500\" alt={evt.titulo} />
              </div>
              <span className=\"text-[8px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase mb-2 inline-block\">{evt.categoria}</span>
              <h3 className=\"text-sm font-bold text-gray-900 uppercase italic line-clamp-2 leading-tight mb-3\">{evt.titulo}</h3>
              <div className=\"flex items-center gap-3 text-[10px] text-gray-500 font-bold uppercase\">
                <span className=\"flex items-center gap-1\"><span className=\"material-symbols-outlined text-xs\">calendar_today</span> {evt.data_inicio}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventosDestaque;