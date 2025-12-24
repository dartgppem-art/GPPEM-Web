import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-music-education.jpg"; // Use uma imagem bonita de contato/fones

const Contato = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Estados do Formulário
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.user_name || !formData.user_email || !formData.message || !formData.subject) {
      toast({ variant: "destructive", title: "Campos obrigatórios", description: "Preencha todos os campos." });
      return;
    }

    setLoading(true);

    // --- CONFIGURAÇÃO DO EMAILJS ---
    const serviceID = "service_pvw6l2v";
    const templateID = "template_dzry15a";
    const publicKey = "t8xvvglMuH2I8N-NC";

    const templateParams = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast({ 
          title: "Mensagem Enviada! 🚀", 
          description: "Recebemos seu contato e responderemos em breve." 
        });
        setFormData({ user_name: "", user_email: "", subject: "", message: "" }); // Limpa form
      }, (err) => {
        console.log('FAILED...', err);
        toast({ 
          variant: "destructive", 
          title: "Erro no envio", 
          description: "Houve um problema. Tente nos enviar um e-mail direto: dart.gppem@gmail.com" 
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <PageLayout>
      <PageHero
        title="Contato"
        subtitle="Entre em contato com nossa equipe de pesquisa."
        image={heroImage}
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Informações de Contato (Lado Esquerdo) */}
          <div className="space-y-8 animate-slide-right">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Fale Conosco</h2>
              <p className="text-gray-600 leading-relaxed">
                Tem dúvidas sobre nossos projetos, eventos ou quer saber como participar do grupo de pesquisa?
                Preencha o formulário ou utilize nossos canais oficiais.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Endereço</h3>
                  <p className="text-gray-600 text-sm">
                    Universidade do Estado do Rio Grande do Norte (UERN)<br/>
                    Departamento de Artes (DART)<br/>
                    Campus Central - Mossoró/RN
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">E-mail</h3>
                  <p className="text-gray-600 text-sm">dart.gppem@gmail.com</p>                  
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Horário de Atendimento</h3>
                  <p className="text-gray-600 text-sm">Segunda a Sexta: 07:00 - 11:00 / 13:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário (Lado Direito) */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-slide-up">
            <div className="flex items-center gap-2 mb-6 text-primary font-bold">
               <span className="material-symbols-outlined">send</span>
               <h3>Envie uma Mensagem</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Nome Completo</label>
                <input 
                  type="text" 
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">E-mail</label>
                <input 
                  type="email" 
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Assunto</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="" disabled>Selecione um assunto</option>
                  <option value="Dúvida Geral">Dúvida Geral</option>
                  <option value="Inscrição em Eventos">Inscrição em Eventos</option>
                  <option value="Parcerias">Parcerias e Pesquisa</option>
                  <option value="Certificados">Solicitação de Certificados</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Mensagem</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Escreva sua mensagem..."
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                {loading ? "Enviando..." : (
                  <>Enviar Mensagem <span className="material-symbols-outlined">send</span></>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default Contato;