import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import QuickAccessCard from "@/components/ui/QuickAccessCard";
import { supabase } from "@/lib/supabase";
import heroImage from "@/assets/hero-music-education.jpg";

const Index = () => {
  const [destaques, setDestaques] = useState<any[]>([]);
  const [linhas, setLinhas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const hoje = new Date().toISOString().split('T')[0];
      
      // Radar GPPEM: Busca eventos iminentes
      const { data: eventosData } = await supabase
        .from('eventos')
        .select('*')
        .gte('data_inicio', hoje) 
        .order('data_inicio', { ascending: true })
        .limit(3);

      // Linhas de Pesquisa: Busca eixos reais do banco
      const { data: linhasData } = await supabase
        .from('linhas_pesquisa')
        .select('*')
        .order('id', { ascending: true });

      setDestaques(eventosData || []);
      setLinhas(linhasData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <PageLayout>
      {/* Hero Section Institucional */}
      <div className="px-4 py-6 w-full">
        <div className="relative w-full h-[340px] lg:h-[420px] rounded-2xl overflow-hidden shadow-xl group bg-primary-dark">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-overlay" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-6 lg:px-12 max-w-4xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              GPPEM DART/UERN
            </div>
            <h1 className="text-3xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter italic uppercase animate-slide-up">Perspectivas em <br /><span className="text-primary-light">Educação Musical</span></h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8 items-start">
        
        {/* COLUNA 1: CARDS DE ACESSO RÁPIDO COM NAVEGAÇÃO ATIVADA */}
        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
          <QuickAccessCard 
            title="Quem Somos" 
            icon="groups" 
            description="Conheça nossa trajetória acadêmica." 
            to="/quem-somos" 
            color="bg-blue-600" 
          />
          <QuickAccessCard 
            title="Publicações" 
            icon="auto_stories" 
            description="Acesse artigos e produções do grupo." 
            to="/publicacoes" 
            color="bg-indigo-700" 
          />
          <QuickAccessCard 
            title="Acervo GPPEM" 
            icon="photo_library" 
            description="Galeria de fotos e memórias." 
            to="/acervo" 
            color="bg-emerald-600" 
          />
        </div>

        {/* COLUNAS DE CONTEÚDO DINÂMICO (RADAR E EIXOS) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-xl text-gray-900 uppercase italic tracking-tighter">Radar GPPEM</h3>
              <Link to="/eventos" className="text-[10px] font-black text-slate-400 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest">Agenda Completa →</Link>
            </div>
            <div className="space-y-3">
              {destaques.map((evt) => (
                <Link to={`/evento/${evt.id}`} key={evt.id} className="group flex items-center gap-5 p-4 rounded-[2rem] hover:bg-slate-50 transition-all">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={evt.foto_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800 uppercase italic group-hover:text-primary transition-colors leading-tight">{evt.titulo}</h4>
                  </div>
                  <span className="material-symbols-outlined text-gray-200">chevron_right</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-primary-dark rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
             <div className="relative z-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-light italic mb-6">Eixos de Investigação</h3>
                <div className="grid gap-3">
                  {linhas.map((linha, idx) => (
                    <Link 
                      to="/linhas-de-pesquisa" 
                      key={idx} 
                      className="flex items-center gap-3 text-sm font-bold bg-white/5 p-3 rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:scale-[1.02]"
                    >
                      <span className="w-2 h-2 bg-primary-light rounded-full"></span>
                      <span className="uppercase italic tracking-tight">{linha.titulo}</span>
                    </Link>
                  ))}
                </div>
             </div>
             <span className="absolute -bottom-10 -right-10 material-symbols-outlined text-[120px] opacity-5">hub</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;