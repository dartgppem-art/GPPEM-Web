import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { supabase } from "@/lib/supabase"; 
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Evento {
  id: number;
  titulo: string;
  data: string;
  descricao: string;
  programacao: string;
  local: string;
  link: string;
  foto_url: string;
  categoria: string;
}

interface FotoGaleria {
  id: number;
  foto_url: string;
}

const AdminEventos = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Estados do Formulário
  const [titulo, setTitulo] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [programacao, setProgramacao] = useState("");
  const [local, setLocal] = useState("");
  const [linkEvento, setLinkEvento] = useState("");
  const [categoria, setCategoria] = useState("geral");
  const [photo, setPhoto] = useState<File | null>(null);

  // Estados da Galeria
  const [galeria, setGaleria] = useState<FotoGaleria[]>([]);
  const [uploadingGaleria, setUploadingGaleria] = useState(false);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    const { data } = await supabase.from('eventos').select('*').order('id', { ascending: false });
    setEventos(data || []);
  };

  const fetchGaleria = async (idEvento: number) => {
    const { data } = await supabase.from('galeria_eventos').select('*').eq('evento_id', idEvento);
    setGaleria(data || []);
  };

  const handleEdit = (evento: Evento) => {
    setEditingId(evento.id);
    setTitulo(evento.titulo);
    setDataEvento(evento.data);
    setDescricao(evento.descricao);
    setProgramacao(evento.programacao || ""); 
    setLocal(evento.local);
    setLinkEvento(evento.link);
    setCategoria(evento.categoria);
    setPhoto(null);
    fetchGaleria(evento.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitulo(""); setDataEvento(""); setDescricao(""); setProgramacao(""); setLocal(""); setLinkEvento(""); setCategoria("geral");
    setPhoto(null);
    setGaleria([]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !categoria) return;

    setLoading(true);
    try {
      let finalPhotoUrl = "";
      
      // Se estiver editando e não trocou a foto, mantém a atual
      if (editingId && !photo) {
        const current = eventos.find(e => e.id === editingId);
        finalPhotoUrl = current?.foto_url || "";
      }
      
      // Upload da foto principal (Cartaz)
      if (photo) {
        const fileName = `evt_${Date.now()}_${photo.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const { error: uploadError } = await supabase.storage.from('fotos').upload(fileName, photo);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('fotos').getPublicUrl(fileName);
        finalPhotoUrl = urlData.publicUrl;
      }

      const payload = { 
        titulo, 
        data: dataEvento, 
        descricao, 
        programacao, 
        local, 
        link: linkEvento, 
        categoria, 
        foto_url: finalPhotoUrl 
      };

      if (editingId) {
        const { error } = await supabase.from('eventos').update(payload).eq('id', editingId);
        if (error) throw error;
        toast({ title: "Atualizado!", description: "Evento editado com sucesso." });
      } else {
        const { error } = await supabase.from('eventos').insert([payload]);
        if (error) throw error;
        toast({ title: "Sucesso!", description: "Novo evento criado." });
      }

      if (!editingId) handleCancelEdit();
      fetchEventos();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Upload Múltiplo da Galeria
  const handleUploadGaleria = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editingId) return;
    
    setUploadingGaleria(true);
    const files = Array.from(e.target.files);
    let successCount = 0;
    
    try {
      for (const file of files) {
        const fileName = `galeria_${editingId}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const { error: uploadError } = await supabase.storage.from('fotos').upload(fileName, file);
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage.from('fotos').getPublicUrl(fileName);
        
        await supabase.from('galeria_eventos').insert([{ 
          evento_id: editingId, 
          foto_url: urlData.publicUrl 
        }]);
        successCount++;
      }
      toast({ title: "Upload Concluído!", description: `${successCount} fotos adicionadas.` });
      fetchGaleria(editingId);
    } catch (error: any) {
      console.error(error);
      toast({ variant: "destructive", title: "Erro", description: "Falha ao enviar algumas fotos." });
    } finally {
      setUploadingGaleria(false);
      e.target.value = ""; 
    }
  };

  const handleDeleteFotoGaleria = async (id: number) => {
    if(!confirm("Apagar esta foto?")) return;
    const { error } = await supabase.from('galeria_eventos').delete().eq('id', id);
    if (!error && editingId) fetchGaleria(editingId);
  }

  const handleDelete = async (id: number) => {
    if(!confirm("Tem certeza que deseja excluir este evento?")) return;
    await supabase.from('eventos').delete().eq('id', id);
    fetchEventos();
  };

  return (
    <PageLayout>
      <div className="bg-muted/30 min-h-screen pb-12">
        <div className="bg-card border-b border-border py-6 px-4 mb-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-xl font-bold">Gerenciar Eventos</h1>
            <div className="flex gap-2 mt-4">
              <Link to="/admin" className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">Equipe</Link>
              <Link to="/admin/eventos" className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">Eventos</Link>
            </div>
          </div>
        </div>

        <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA 1: FORMULÁRIO */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm sticky top-24">
              <h2 className="font-bold text-lg mb-4">
                {editingId ? "Editar Evento" : "Novo Evento"}
              </h2>
              
              <form onSubmit={handleSave} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Título</label>
                  <input value={titulo} onChange={e => setTitulo(e.target.value)} className="w-full p-2 bg-muted rounded outline-none text-sm" placeholder="Ex: IV FEMUERN" required />
                </div>

                <div className="space-y-1">
                   <label className="text-xs font-bold text-muted-foreground uppercase">Categoria</label>
                   <select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full p-2 bg-muted rounded outline-none text-sm">
                    <option value="geral">Notícia Geral</option>
                    <option value="femuern">FEMUERN</option>
                    <option value="egressos">Encontro de Egressos</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Data</label>
                  <input value={dataEvento} onChange={e => setDataEvento(e.target.value)} className="w-full p-2 bg-muted rounded outline-none text-sm" placeholder="Ex: 20 a 22 de Outubro" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Local</label>
                  <input value={local} onChange={e => setLocal(e.target.value)} className="w-full p-2 bg-muted rounded outline-none text-sm" placeholder="Local" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Apresentação</label>
                  <textarea value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full p-2 bg-muted rounded outline-none h-24 text-sm" placeholder="Sobre o evento..." />
                </div>
                
                {/* NOVO CAMPO: PROGRAMAÇÃO */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Programação</label>
                  <textarea value={programacao} onChange={e => setProgramacao(e.target.value)} className="w-full p-2 bg-muted rounded outline-none h-24 text-sm" placeholder="Cole o cronograma aqui..." />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Link Externo</label>
                  <input value={linkEvento} onChange={e => setLinkEvento(e.target.value)} className="w-full p-2 bg-muted rounded outline-none text-sm" placeholder="Link de Inscrição" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Cartaz Oficial</label>
                  <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files ? e.target.files[0] : null)} className="w-full text-xs" />
                </div>

                <div className="flex gap-2 pt-2">
                  <button disabled={loading} className="flex-1 bg-primary text-primary-foreground py-2 rounded font-bold hover:bg-primary/90 transition-all text-sm">
                    {loading ? "Salvando..." : (editingId ? "Salvar Alterações" : "Criar Evento")}
                  </button>
                  {editingId && <button type="button" onClick={handleCancelEdit} className="px-3 bg-gray-200 rounded font-bold text-gray-600 hover:bg-gray-300">X</button>}
                </div>
              </form>

              {/* ÁREA DA GALERIA (SÓ APARECE AO EDITAR) */}
              {editingId && (
                <div className="mt-8 border-t pt-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-primary text-lg">photo_library</span>
                    Galeria de Fotos
                  </h3>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    Segure <strong>Ctrl</strong> (ou Shift) para selecionar várias fotos.
                  </p>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    disabled={uploadingGaleria}
                    onChange={handleUploadGaleria}
                    className="w-full text-xs mb-4 file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
                  />
                  
                  {uploadingGaleria && <p className="text-xs text-blue-600 animate-pulse mb-2">Enviando fotos...</p>}

                  {/* CAIXA DE ROLAGEM (SCROLL BOX) */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-muted-foreground">Fotos Carregadas ({galeria.length})</label>
                        {galeria.length > 6 && <span className="text-[10px] text-blue-500">Role para ver mais ↓</span>}
                    </div>

                    <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
                        {galeria.length === 0 && (
                            <div className="col-span-3 py-8 text-center text-gray-400 text-xs">
                                Nenhuma foto extra adicionada.
                            </div>
                        )}

                        {galeria.map(foto => (
                        <div key={foto.id} className="relative group aspect-square bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm">
                            <img src={foto.foto_url} className="w-full h-full object-cover" />
                            <button 
                            onClick={() => handleDeleteFotoGaleria(foto.id)}
                            className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700"
                            type="button"
                            title="Remover foto"
                            >
                            <span className="material-symbols-outlined text-[12px]">close</span>
                            </button>
                        </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* COLUNA 2: LISTA DE EVENTOS */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-bold text-lg mb-4">Eventos Cadastrados ({eventos.length})</h2>
            <div className="grid gap-3">
              {eventos.map((evt) => (
                <div key={evt.id} className="bg-card p-4 rounded-xl border border-border flex gap-4 hover:shadow-md transition-all">
                  <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 overflow-hidden relative border border-gray-100">
                    {evt.foto_url ? (
                        <img src={evt.foto_url} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <span className="material-symbols-outlined">image</span>
                        </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900">{evt.titulo}</h3>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            evt.categoria === 'femuern' ? 'bg-purple-100 text-purple-700' :
                            evt.categoria === 'egressos' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                            {evt.categoria}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        <span>📅 {evt.data}</span>
                        <span>📍 {evt.local}</span>
                    </p>
                    <div className="flex gap-3 mt-3">
                      <button onClick={() => handleEdit(evt)} className="text-xs flex items-center gap-1 text-blue-600 font-bold hover:underline">
                        <span className="material-symbols-outlined text-[14px]">edit</span> Editar / Galeria
                      </button>
                      <button onClick={() => handleDelete(evt.id)} className="text-xs flex items-center gap-1 text-red-500 font-bold hover:underline">
                        <span className="material-symbols-outlined text-[14px]">delete</span> Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </PageLayout>
  );
};

export default AdminEventos;