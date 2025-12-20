import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { db, storage } from "@/services/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Interface para tipar os dados do membro
interface Member {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
}

const AdminEquipe = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  
  // Estados do Formulário
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  // 1. BUSCAR DADOS (READ)
  const fetchMembers = async () => {
    try {
      const q = query(collection(db, "team"), orderBy("name"));
      const querySnapshot = await getDocs(q);
      const membersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Member[];
      setMembers(membersList);
    } catch (error) {
      console.error("Erro ao buscar equipe:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // 2. SALVAR NOVO MEMBRO (CREATE)
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo || !name || !role) {
      toast({ variant: "destructive", title: "Erro", description: "Preencha todos os campos e a foto." });
      return;
    }

    setLoading(true);
    try {
      // A. Upload da Imagem
      const storageRef = ref(storage, `team/${Date.now()}-${photo.name}`);
      await uploadBytes(storageRef, photo);
      const photoUrl = await getDownloadURL(storageRef);

      // B. Salvar no Firestore
      await addDoc(collection(db, "team"), {
        name,
        role,
        photoUrl,
        createdAt: new Date()
      });

      toast({ title: "Sucesso!", description: "Membro adicionado à equipe." });
      
      // Limpar formulário e atualizar lista
      setName("");
      setRole("");
      setPhoto(null);
      fetchMembers(); // Recarrega a lista

    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Erro", description: "Falha ao salvar membro." });
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETAR MEMBRO (DELETE)
  const handleDelete = async (id: string) => {
    if(!confirm("Tem certeza que deseja excluir este membro?")) return;
    
    try {
      await deleteDoc(doc(db, "team", id));
      toast({ title: "Excluído", description: "Membro removido com sucesso." });
      fetchMembers();
    } catch (error) {
      toast({ variant: "destructive", title: "Erro", description: "Erro ao excluir." });
    }
  };

  return (
    <PageLayout>
      <div className="bg-muted/30 min-h-screen pb-12">
        {/* Header */}
        <div className="bg-card border-b border-border py-6 px-4 mb-8">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <Link to="/admin" className="p-2 hover:bg-muted rounded-full transition-colors">
              <span className="material-symbols-outlined text-muted-foreground">arrow_back</span>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Gerenciar Equipe</h1>
              <p className="text-sm text-muted-foreground">Adicione novos pesquisadores ao site</p>
            </div>
          </div>
        </div>

        <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA 1: FORMULÁRIO DE CADASTRO */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm sticky top-24">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person_add</span>
                Novo Membro
              </h2>
              
              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Nome Completo</label>
                  <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full mt-1 p-2 bg-muted rounded-lg border-none focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Ex: Dra. Maria Silva"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Cargo/Função</label>
                  <input 
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full mt-1 p-2 bg-muted rounded-lg border-none focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Ex: Pesquisadora Sênior"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Foto de Perfil</label>
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={e => setPhoto(e.target.files ? e.target.files[0] : null)}
                    className="w-full mt-1 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {loading ? "Salvando..." : "Adicionar Membro"}
                  {!loading && <span className="material-symbols-outlined">save</span>}
                </button>
              </form>
            </div>
          </div>

          {/* COLUNA 2: LISTA DE MEMBROS */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">groups</span>
              Membros Cadastrados ({members.length})
            </h2>

            {members.length === 0 ? (
              <div className="text-center py-12 bg-muted/50 rounded-xl border-dashed border-2 border-muted-foreground/20">
                <p className="text-muted-foreground">Nenhum membro encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {members.map((member) => (
                  <div key={member.id} className="bg-card p-4 rounded-xl border border-border flex items-center gap-4 group hover:shadow-md transition-all">
                    <img 
                      src={member.photoUrl} 
                      alt={member.name} 
                      className="w-12 h-12 rounded-full object-cover bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate">{member.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      title="Excluir Membro"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </PageLayout>
  );
};

export default AdminEquipe;