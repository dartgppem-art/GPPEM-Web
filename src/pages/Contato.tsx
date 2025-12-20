import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import { useToast } from "@/hooks/use-toast";
// IMPORT ATUALIZADO:
import heroContato from "@/assets/hero-contato.jpg";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Agradecemos seu contato. Responderemos em breve.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <PageLayout>
      <PageHero
        title="Contato"
        subtitle="Entre em contato com o GPPEM"
        image={heroContato} // Imagem específica
      />

      <main className="px-4 pt-6 pb-8 space-y-6 max-w-3xl mx-auto">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary">location_on</span>
              </div>
              <div>
                <h3 className="font-bold text-card-foreground text-sm mb-1">Endereço</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Universidade do Estado do Rio Grande do Norte (UERN)
                  <br />
                  Departamento de Artes - DART
                  <br />
                  Mossoró, RN - Brasil
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary">mail</span>
              </div>
              <div>
                <h3 className="font-bold text-card-foreground text-sm mb-1">E-mail</h3>
                <p className="text-xs text-muted-foreground">gppem@uern.br</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Respondemos em até 48 horas úteis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <h3 className="font-bold text-card-foreground text-sm mb-4">Redes Sociais</h3>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span className="material-symbols-outlined text-xl">play_circle</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">edit_note</span>
            <h2 className="text-lg font-bold text-card-foreground">Envie uma Mensagem</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-card-foreground mb-1">
                Assunto
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary text-foreground"
              >
                <option value="">Selecione um assunto</option>
                <option value="pesquisa">Participar de Pesquisa</option>
                <option value="parceria">Proposta de Parceria</option>
                <option value="informacoes">Informações Gerais</option>
                <option value="eventos">Eventos</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-1">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground resize-none"
                placeholder="Escreva sua mensagem..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>Enviar Mensagem</span>
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </form>
        </div>
      </main>
    </PageLayout>
  );
};

export default Contato;