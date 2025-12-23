import PageLayout from "@/components/layout/PageLayout";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const EventoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Usamos o navigate para voltar
  const [evento, setEvento] = useState<any>(null);
  const [galeria, setGaleria] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("sobre");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchDados();
  }, [id]);

  const fetchDados = async () => {
    const { data: eventoData } = await supabase.from('eventos').select('*').eq('id', id).single();
    setEvento(eventoData);
    const { data: galeriaData } = await supabase.from('galeria_eventos').select('*').eq('evento_id', id);
    setGaleria(galeriaData || []);
    setLoading(false);
  };

  // Função para voltar uma página no histórico
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <PageLayout><div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div></PageLayout>;
  if (!evento) return <PageLayout><div className="p-20 text-center">Evento não encontrado.</div></PageLayout>;

  return (
    <PageLayout>
      <div className="bg-gray-50 min-h-screen">
        
        {/* CABEÇALHO INSTITUCIONAL */}
        <div className="bg-white border-b border-gray-200 py-8 shadow-sm">
            <div className="container mx-auto px-4 max-w-6xl">
                
                {/* --- BOTÃO VOLTAR MELHORADO --- */}
                <button 
                    onClick={handleGoBack} 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-primary hover:text-primary transition-all mb-6 shadow-sm"
                >
                    <span className="material-symbols-outlined text-sm font-bold">arrow_back</span> Voltar
                </button>
                {/* -------------------------------- */}
                
                <div className="flex flex-col gap-3">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase w-fit tracking-wider border ${
                        evento.categoria === 'femuern' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        evento.categoria === 'egressos' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                        'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                        {evento.categoria}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        {evento.titulo}
                    </h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mt-2 font-medium text-sm">
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">event</span> {evento.data}</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">location_on</span> {evento.local}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* COLUNA ESQUERDA: CONTEÚDO */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* MENU DE ABAS (O botão da galeria é a terceira aba) */}
                    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 no-scrollbar overflow-x-auto">
                        <button 
                            onClick={() => setActiveTab("sobre")}
                            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 whitespace-nowrap ${
                                activeTab === "sobre" 
                                ? "bg-primary text-white shadow-md" 
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                        >
                            Apresentação
                        </button>
                        <button 
                            onClick={() => setActiveTab("programacao")}
                            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 whitespace-nowrap ${
                                activeTab === "programacao" 
                                ? "bg-primary text-white shadow-md" 
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                        >
                            Programação
                        </button>
                        {galeria.length > 0 && (
                            <button 
                                onClick={() => setActiveTab("galeria")}
                                className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                                    activeTab === "galeria" 
                                    ? "bg-primary text-white shadow-md" 
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                }`}
                            >
                                Galeria de Fotos <span className={`px-1.5 rounded text-[10px] ${activeTab === 'galeria' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>{galeria.length}</span>
                            </button>
                        )}
                    </div>

                    {/* Conteúdo das Abas */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
                        
                        {activeTab === "sobre" && (
                            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 border-l-4 border-primary pl-3">Sobre o Evento</h3>
                                <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed whitespace-pre-line text-justify">
                                    {evento.descricao}
                                </div>
                            </div>
                        )}

                        {activeTab === "programacao" && (
                            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 border-l-4 border-primary pl-3">Cronograma de Atividades</h3>
                                {evento.programacao ? (
                                    <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-lg border border-gray-100 font-mono text-sm md:text-base">
                                        {evento.programacao}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
                                        <p className="text-gray-400 italic">Programação detalhada ainda não divulgada.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "galeria" && (
                            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 border-l-4 border-primary pl-3">Registros do Evento</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {galeria.map((foto) => (
                                        <div 
                                            key={foto.id} 
                                            className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all"
                                            onClick={() => setSelectedImage(foto.foto_url)}
                                        >
                                            <img src={foto.foto_url} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* COLUNA DIREITA: SIDEBAR */}
                <div className="lg:col-span-4 space-y-6 sticky top-24">
                    
                    {/* Card do Cartaz */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 w-full text-center">Cartaz Oficial</p>
                        <div className="w-full max-w-[280px] rounded-lg overflow-hidden bg-gray-100 mb-5 border border-gray-200 shadow-sm cursor-zoom-in" onClick={() => setSelectedImage(evento.foto_url)}>
                            {evento.foto_url ? (
                                <img src={evento.foto_url} alt="Cartaz" className="w-full h-auto object-contain hover:scale-105 transition-transform" />
                            ) : (
                                <div className="aspect-[3/4] flex items-center justify-center text-gray-300"><span className="material-symbols-outlined text-4xl">image</span></div>
                            )}
                        </div>
                        {evento.link ? (
                            <a href={evento.link} target="_blank" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                Inscrever-se / Acessar <span className="material-symbols-outlined text-sm">open_in_new</span>
                            </a>
                        ) : (
                            <button disabled className="w-full bg-gray-100 text-gray-400 font-bold py-3 rounded-lg cursor-not-allowed border border-gray-200">
                                Inscrições Encerradas
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* LIGHTBOX (Zoom da Galeria e Cartaz) */}
        {selectedImage && (
            <div 
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-zoom-out"
                onClick={() => setSelectedImage(null)}
            >
                <img 
                    src={selectedImage} 
                    className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-lg"
                    onClick={(e) => e.stopPropagation()} 
                />
                <button className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition-all">
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>
            </div>
        )}

      </div>
    </PageLayout>
  );
};

export default EventoDetalhes;