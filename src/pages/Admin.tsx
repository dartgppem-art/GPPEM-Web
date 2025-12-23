import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState<"membros" | "linhas_pesquisa" | "publicacoes" | "eventos" | "acervo">("membros");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});
  
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fotosExistentes, setFotosExistentes] = useState<any[]>([]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast({ title: "Sessão encerrada" });
      window.location.href = "/";
    }
  };

  useEffect(() => {
    fetchData();
    resetForm();
  }, [currentTab]);

  const fetchData = async () => {
    setLoading(true);
    const table = currentTab === "acervo" ? "eventos" : currentTab;
    const { data } = await supabase.from(table).select('*').order('id', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  const fetchFotosAcervo = async (eventoId: number) => {
    const { data } = await supabase.from('galeria_eventos').select('*').eq('evento_id', eventoId);
    setFotosExistentes(data || []);
  };

  const resetForm = () => {
    setFormData({});
    setEditingId(null);
    setSelectedFiles(null);
    setUploadProgress(0);
    setFotosExistentes([]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from('fotos').upload(fileName, file);
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('fotos').getPublicUrl(fileName);
      setFormData({ ...formData, foto_url: publicUrl });
      toast({ title: "Arquivo carregado!" });
    }
    setLoading(false);
  };

  const handleConfirmarAcervo = async () => {
    if (!selectedFiles || !editingId) return;
    setLoading(true);
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileName = `${Date.now()}_acervo_${file.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage.from('fotos').upload(fileName, file);
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('fotos').getPublicUrl(fileName);
        await supabase.from('galeria_eventos').insert([{ evento_id: editingId, foto_url: publicUrl }]);
      }
      setUploadProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
    }
    toast({ title: "Acervo Atualizado!" });
    fetchFotosAcervo(editingId);
    setSelectedFiles(null);
    setLoading(false);
  };

  const handleDeleteFotoAcervo = async (fotoId: number) => {
    if (!confirm("Remover esta foto?")) return;
    const { error } = await supabase.from('galeria_eventos').delete().eq('id', fotoId);
    if (!error) {
      toast({ title: "Removida!" });
      if (editingId) fetchFotosAcervo(editingId);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTab === "acervo") return;
    setLoading(true);

    const payload = { ...formData };
    if (!payload.lattes_url) delete payload.lattes_url;
    if (!payload.biografia) delete payload.biografia;

    const { error } = editingId 
      ? await supabase.from(currentTab).update(payload).eq('id', editingId)
      : await supabase.from(currentTab).insert([payload]);

    if (!error) {
      toast({ title: "Sucesso!", description: "Dados guardados com êxito." });
      resetForm();
      fetchData();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Excluir registro permanentemente?")) return;
    setLoading(true);
    const targetTable = currentTab === "acervo" ? "eventos" : currentTab;
    await supabase.from(targetTable).delete().eq('id', id);
    fetchData();
    setLoading(false);
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setEditingId(item.id);
    if (currentTab === "acervo") fetchFotosAcervo(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageLayout>
      <div className="bg-slate-50 min-h-screen pb-20 relative">
        
        {/* HEADER AZUL: Rebaixado para o fundo (z-10) */}
        <header className="bg-primary text-white pt-16 pb-24 px-4 shadow-2xl relative z-10">
          <button onClick={handleLogout} className="absolute top-6 right-6 flex items-center gap-2 bg-white/10 hover:bg-red-500 px-4 py-2 rounded-full transition-all text-[10px] font-black uppercase tracking-widest border border-white/20">
            <span className="material-symbols-outlined text-sm">logout</span> Sair do Painel
          </button>
          
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-black mb-2 italic uppercase tracking-tighter">Painel Administrativo GPPEM</h1>
            <p className="text-blue-200 font-bold mb-10 tracking-[0.4em] text-[10px] uppercase">DART / UERN</p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: "membros", label: "Equipe", icon: "groups" },
                { id: "linhas_pesquisa", label: "Linhas Pesquisa", icon: "hub" },
                { id: "publicacoes", label: "Publicações", icon: "library_books" },
                { id: "eventos", label: "Eventos", icon: "calendar_month" },
                { id: "acervo", label: "Acervo (Fotos)", icon: "photo_library" }
              ].map((tab) => (
                <button key={tab.id} onClick={() => setCurrentTab(tab.id as any)} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${currentTab === tab.id ? "bg-white text-primary shadow-lg" : "bg-blue-900/40 hover:bg-blue-900/60"}`}>
                  <span className="material-symbols-outlined text-sm">{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL: Elevado para a frente de tudo (z-40) */}
        <main className="max-w-6xl mx-auto px-4 -mt-12 relative z-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Coluna de Cadastro: Mantém a elevação z-40 */}
            <div className="lg:col-span-5 lg:sticky lg:top-6 z-40">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-8 border-primary">
                <h2 className="text-xl font-black text-gray-800 mb-6 uppercase italic">
                   {currentTab === 'acervo' ? "🖼️ Gestão de Acervo" : editingId ? "📝 Editar" : "✨ Novo Registro"}
                </h2>
                
                {currentTab === "acervo" ? (
                  <div className="space-y-6 bg-blue-50 p-6 rounded-3xl border border-blue-100">
                    <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed">Selecione um evento na lista ao lado para gerenciar as fotos.</p>
                    {editingId && (
                      <div className="mt-4 space-y-6">
                        <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 bg-white rounded-xl border">
                          {fotosExistentes.map(foto => (
                            <div key={foto.id} className="relative group aspect-square rounded-lg overflow-hidden"><img src={foto.foto_url} className="w-full h-full object-cover" /><button onClick={() => handleDeleteFotoAcervo(foto.id)} className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"><span className="material-symbols-outlined">delete</span></button></div>
                          ))}
                        </div>
                        <input type="file" multiple onChange={e => setSelectedFiles(e.target.files)} className="text-[9px] w-full" />
                        {selectedFiles && <button onClick={handleConfirmarAcervo} className="w-full bg-green-600 text-white p-4 rounded-xl font-black uppercase shadow-lg">{loading ? "ENVIANDO..." : "ENVIAR FOTOS"}</button>}
                        <button onClick={resetForm} className="w-full text-gray-400 font-bold uppercase tracking-widest mt-2">Sair</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSave} className="space-y-4">
                    {currentTab === "membros" && (
                      <>
                        <input type="text" placeholder="Nome Completo" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-primary transition-all" required onChange={e => setFormData({...formData, nome: e.target.value})} value={formData.nome || ''} />
                        <input type="text" placeholder="Cargo / Função" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-primary transition-all" required onChange={e => setFormData({...formData, cargo: e.target.value})} value={formData.cargo || ''} />
                        <input type="url" placeholder="Link do Currículo Lattes" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-primary transition-all" onChange={e => setFormData({...formData, lattes_url: e.target.value})} value={formData.lattes_url || ''} />
                        <textarea placeholder="Breve Biografia / Áreas de Atuação" className="w-full p-4 bg-gray-50 rounded-2xl h-32 resize-none outline-none border-2 border-transparent focus:border-primary transition-all" onChange={e => setFormData({...formData, biografia: e.target.value})} value={formData.biografia || ''}></textarea>
                        <div className="p-4 border-2 border-dashed border-gray-100 rounded-2xl text-center"><input type="file" accept="image/*" onChange={handleFileUpload} className="text-[10px]" />{formData.foto_url && <img src={formData.foto_url} className="h-20 mx-auto mt-2 rounded-full object-cover shadow-md" />}</div>
                      </>
                    )}
                    {currentTab === "linhas_pesquisa" && (
                      <><input type="text" placeholder="Título da Linha" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required onChange={e => setFormData({...formData, titulo: e.target.value})} value={formData.titulo || ''} /><textarea placeholder="Descrição" className="w-full p-4 bg-gray-50 rounded-2xl h-32 resize-none outline-none" required onChange={e => setFormData({...formData, descricao: e.target.value})} value={formData.descricao || ''}></textarea></>
                    )}
                    {currentTab === "publicacoes" && (
                      <><input type="text" placeholder="Título" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required onChange={e => setFormData({...formData, titulo: e.target.value})} value={formData.titulo || ''} /><input type="text" placeholder="Autores" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" onChange={e => setFormData({...formData, autores: e.target.value})} value={formData.autores || ''} /><textarea placeholder="Descrição/Referência" className="w-full p-4 bg-gray-50 rounded-2xl h-24 outline-none" onChange={e => setFormData({...formData, descricao: e.target.value})} value={formData.descricao || ''}></textarea></>
                    )}
                    {currentTab === "eventos" && (
                      <><input type="text" placeholder="Título" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" required onChange={e => setFormData({...formData, titulo: e.target.value})} value={formData.titulo || ''} /><select className="w-full p-4 bg-blue-50 text-primary font-black rounded-2xl outline-none" required onChange={e => setFormData({...formData, categoria: e.target.value})} value={formData.categoria || ''}><option value="">CATEGORIA</option><option value="femuern">FEMUERN</option><option value="egressos">ENCONTRO DE EGRESSOS</option><option value="geral">NOTÍCIA / GERAL</option></select><div className="grid grid-cols-2 gap-2"><input type="date" className="w-full p-4 bg-gray-50 rounded-2xl text-[10px]" onChange={e => setFormData({...formData, data_inicio: e.target.value})} value={formData.data_inicio || ''} /><input type="date" className="w-full p-4 bg-gray-50 rounded-2xl text-[10px]" onChange={e => setFormData({...formData, data_fim: e.target.value})} value={formData.data_fim || ''} /></div><input type="text" placeholder="Local" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" onChange={e => setFormData({...formData, local: e.target.value})} value={formData.local || ''} /><input type="url" placeholder="Link de Inscrição" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" onChange={e => setFormData({...formData, link_inscricao: e.target.value})} value={formData.link_inscricao || ''} /><textarea placeholder="Programação Detalhada" className="w-full p-4 bg-gray-50 rounded-2xl h-32 font-mono text-[10px] outline-none" onChange={e => setFormData({...formData, programacao: e.target.value})} value={formData.programacao || ''}></textarea><div className="p-4 border-2 border-dashed border-blue-200 rounded-2xl text-center"><input type="file" onChange={handleFileUpload} className="text-[10px]" />{formData.foto_url && <img src={formData.foto_url} className="h-24 mx-auto mt-2 rounded-lg object-cover shadow-sm" />}</div></>
                    )}
                    <button type="submit" disabled={loading} className="w-full bg-primary text-white p-5 rounded-2xl font-black text-xs uppercase shadow-xl hover:scale-[1.02] transition-transform">{loading ? "PROCESSANDO..." : "CADASTRAR / SALVAR ALTERAÇÕES"}</button>
                    {editingId && <button type="button" onClick={resetForm} className="w-full text-gray-400 font-bold text-[10px] uppercase mt-2">Cancelar</button>}
                  </form>
                )}
              </div>
            </div>

            {/* Coluna de Listagem: Elevada para z-40 para sobrepor o azul */}
            <div className="lg:col-span-7 z-40">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col h-[750px] relative">
                <h2 className="text-xl font-black text-gray-800 mb-8 uppercase italic flex justify-between items-center">
                  <span>Listagem de Registros</span>
                  <span className="text-[10px] bg-blue-50 text-primary px-3 py-1 rounded-full not-italic tracking-widest italic">{items.length} ITENS</span>
                </h2>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 scroll-smooth">
                  {items.map((item) => (
                    <div key={item.id} className="group p-5 bg-gray-50 rounded-[2rem] hover:bg-white border-2 border-transparent hover:border-blue-100 transition-all flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-4">{item.foto_url && <img src={item.foto_url} className="w-14 h-14 rounded-2xl object-cover shadow-md" />}<div><p className="font-black text-gray-800 leading-tight">{item.nome || item.titulo}</p><p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">{item.cargo || item.categoria || 'Registro'}</p></div></div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className={`p-3 rounded-full material-symbols-outlined transition-colors ${currentTab === 'acervo' ? 'bg-green-100 text-green-600 shadow-sm' : 'text-blue-500 hover:bg-blue-50'}`}>{currentTab === 'acervo' ? 'add_a_photo' : 'edit'}</button>
                        {currentTab !== 'acervo' && <button onClick={() => handleDelete(item.id)} className="p-3 text-red-400 hover:bg-red-50 rounded-full transition-colors material-symbols-outlined">delete</button>}
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="py-20 text-center opacity-30 italic uppercase text-[10px] font-black tracking-widest">Aguardando dados...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default Admin;