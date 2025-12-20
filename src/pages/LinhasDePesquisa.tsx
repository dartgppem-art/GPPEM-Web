import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import ResearchLineCard from "@/components/ui/ResearchLineCard";
// IMPORT ATUALIZADO:
import heroPesquisa from "@/assets/hero-pesquisa.jpg";

const researchLines = [
  {
    icon: "wifi",
    title: "Educação Musical a Distância",
    description:
      "Investigação de metodologias e práticas de ensino musical em ambientes virtuais de aprendizagem, explorando as possibilidades da EaD para democratização do acesso à educação musical.",
  },
  {
    icon: "computer",
    title: "Educação Musical Mediada por Tecnologias",
    description:
      "Estudo do uso de ferramentas digitais, softwares de notação e aplicativos no processo de ensino-aprendizagem da música em diferentes níveis e contextos educacionais.",
  },
  {
    icon: "language",
    title: "Educação Musical Online e Híbrida",
    description:
      "Análise de modelos pedagógicos que integram momentos presenciais e remotos no ensino da música, desenvolvendo estratégias para aprendizagem significativa em ambientes híbridos.",
  },
  {
    icon: "school",
    title: "Ensino e Aprendizagem da Música em diferentes contextos",
    description:
      "Pesquisa sobre processos de ensino-aprendizagem musical em escolas, projetos sociais, conservatórios e espaços não-formais, considerando diversidade cultural e regional.",
  },
  {
    icon: "music_note",
    title: "Educação Musical e Formação Humana",
    description:
      "Investigação dos processos educativos musicais em diversos contextos sociais e sua contribuição para o desenvolvimento integral do ser humano.",
  },
  {
    icon: "history_edu",
    title: "História e Memória da Educação Musical",
    description:
      "Estudos aprofundados sobre narrativas, documentos e trajetórias históricas no ensino da música no Nordeste brasileiro.",
  },
];

const LinhasDePesquisa = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLines = researchLines.filter(
    (line) =>
      line.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      line.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <PageHero
        title="Linhas de Pesquisa"
        subtitle="Explore as principais vertentes investigativas do GPPEM"
        image={heroPesquisa} // Imagem específica
      />

      {/* Search */}
      <div className="px-4 py-4 bg-card sticky top-[60px] z-10 shadow-sm border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-muted-foreground group-focus-within:text-primary transition-colors text-xl">
                search
              </span>
            </div>
            <input
              type="text"
              placeholder="Buscar por tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-none rounded-2xl bg-muted text-foreground placeholder-muted-foreground shadow-sm focus:ring-2 focus:ring-primary focus:bg-card transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="p-5 space-y-6 max-w-3xl mx-auto">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Nossas Áreas de Estudo</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Explore as principais vertentes investigativas do GPPEM, focadas na inovação e na prática pedagógica musical.
          </p>
        </div>

        <div className="space-y-4">
          {filteredLines.map((line) => (
            <ResearchLineCard
              key={line.title}
              icon={line.icon}
              title={line.title}
              description={line.description}
            />
          ))}
        </div>

        {filteredLines.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-4xl text-muted-foreground mb-2">search_off</span>
            <p className="text-muted-foreground">Nenhuma linha de pesquisa encontrada</p>
          </div>
        )}
      </main>
    </PageLayout>
  );
};

export default LinhasDePesquisa;