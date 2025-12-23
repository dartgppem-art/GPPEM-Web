import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Acesso Negado",
        description: "E-mail ou senha incorretos.",
      });
      setLoading(false);
    } else {
      toast({
        title: "Bem-vindo(a)!",
        description: "Login realizado com sucesso.",
      });
      navigate("/admin"); // Manda para o painel
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Cabeçalho do Login */}
        <div className="bg-primary p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Área Restrita</h1>
          <p className="text-blue-100 text-sm">Acesso exclusivo para pesquisadores</p>
        </div>

        {/* Formulário */}
        <div className="p-8 pt-10">
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">E-mail Institucional</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">mail</span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="admin@uern.br"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Senha</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">lock</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              {loading ? "Verificando..." : "Entrar no Sistema"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-primary flex items-center justify-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Voltar ao Site
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;