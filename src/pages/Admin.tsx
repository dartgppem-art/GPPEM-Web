import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(auth.currentUser);

  // Proteção: Se não tiver logado, chuta de volta pro login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    toast({ title: "Desconectado", description: "Você saiu do sistema." });
    navigate("/login");
  };

  return (
    <PageLayout>
      <div className="bg-muted/30 min-h-screen pb-12">
        {/* Cabeçalho do Painel */}
        <div className="bg-card border-b border-border py-8 px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">
                Bem-vindo, <span className="text-primary font-semibold">{user?.email}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              Sair
            </button>
          </div>
        </div>

        {/* Grade de Opções */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Equipe (AGORA É UM LINK CLICÁVEL) */}
            <Link 
              to="/admin/equipe" 
              className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden block"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">groups</span>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-xl">person_add</span>
                </div>
                <h3 className="text-lg font-bold mb-1">Gerenciar Equipe</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione ou remova pesquisadores e discentes.
                </p>
                <div className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Acessar <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* Card 2: Eventos (Ainda sem link, em breve faremos) */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden opacity-70">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">calendar_month</span>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-xl">event</span>
                </div>
                <h3 className="text-lg font-bold mb-1">Gerenciar Eventos</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Crie novos eventos ou edite a agenda.
                </p>
                <button className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all cursor-not-allowed">
                  Em breve <span className="material-symbols-outlined text-base">lock</span>
                </button>
              </div>
            </div>

            {/* Card 3: Linhas de Pesquisa (Ainda sem link) */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden opacity-70">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">menu_book</span>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
                </div>
                <h3 className="text-lg font-bold mb-1">Linhas de Pesquisa</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Atualize as descrições das linhas de pesquisa.
                </p>
                <button className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all cursor-not-allowed">
                  Em breve <span className="material-symbols-outlined text-base">lock</span>
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default Admin;