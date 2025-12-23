import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import heroImage from "@/assets/event-seminar.jpg";

interface Evento {
  id: number;
  titulo: string;
  data: string;
  local: string;
  descricao: string;
  foto_url: string;
  link?: string;
}

const EncontroDeEgressos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEgressos();
  }, []);

  const fetchEgressos = async () => {
    const { data } = await supabase
      .from('eventos')
      .select('*')
      .eq('categoria', 'egressos')
      .order('id', { ascending: false });
    setEventos(data || []);
    setLoading(false);
  };

  return (
    <PageLayout>
      <PageHero
        title="Encontro de Egressos"
        subtitle="Fortalecendo laços e celebrando trajetórias."
        image={heroImage}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* BOTÃO VOLTAR (Adicionado) */}
        <Link to="/eventos" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#7f392b] mb-6 transition-colors font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Voltar para Eventos
        </Link>

        {/* Cabeçalho da Lista */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
           <div>
             <h2 className="text-2xl font-bold text-gray-900">Histórico de Encontros</h2>
             <p className="text-sm text-gray-500">Relembre os momentos e trocas de experiências das edições passadas.</p>
           </div>
           <span className="bg-[#7f392b]/10 text-[#7f392b] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4">
             {eventos.length} Registros
           </span>
        </div>

        {loading ? (
          <div className="py-12 text-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7f392b] mx-auto"></div>
             <p className="text-sm text-gray-400 mt-2">Carregando...</p>
          </div>
        ) : eventos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
            <p className="text-gray-500">Nenhum encontro registrado ainda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {eventos.map((evt) => (
              <Link 
                to={`/evento/${evt.id}`} 
                key={evt.id}
                className="group flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-[#7f392b]/30 transition-all duration-200"
              >
                <div className="w-full sm:w-48 h-48 sm:h-auto bg-gray-100 relative flex-shrink-0">
                  {evt.foto_url ? (
                    <img src={evt.foto_url} alt={evt.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300"><span className="material-symbols-outlined text-3xl">groups</span></div>
                  )}
                  <div className="absolute top-2 right-2 sm:hidden">
                     <span className="bg-[#7f392b] text-white px-2 py-1 rounded text-[10px] font-bold uppercase shadow-sm">Egressos</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-center flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7f392b] transition-colors mb-2 line-clamp-2">{evt.titulo}</h3>
                    <span className="hidden sm:inline-flex items-center text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded uppercase group-hover:bg-[#7f392b]/10 group-hover:text-[#7f392b] transition-colors">
                      <span className="material-symbols-outlined text-[14px] mr-1">visibility</span> Acessar
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#7f392b]">calendar_today</span> {evt.data}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#7f392b]">location_on</span> {evt.local}</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-0">{evt.descricao}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default EncontroDeEgressos;