import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/Layout/PageHero";
import PublicationCard from "@/components/ui/PublicationCard";
import publicationFeatured from "@/assets/publication-featured.jpg";

const publications = [
  {
    title: "A Importância da Música na Educação Infantil: Um Estudo de Caso",
    authors: "Maria Silva, João Souza",
    type: "Artigo Científico",
    year: "2024",
    description:
      "Este estudo investiga como a introdução precoce de instrumentos musicais influencia o desenvolvimento cognitivo e social em crianças de 4 a 6 anos.",
    featured: true,
    imageUrl: publicationFeatured,
  },
  {
    title: "Metodologias Ativas no Ensino de Música",
    authors: "Carlos Pereira",
    type: "Revista Brasileira de Música",
    year: "2023",
    description:
      "Análise comparativa entre métodos tradicionais e abordagens participativas em escolas públicas do Rio Grande do Norte.",
  },
  {
    title: "Tecnologias Digitais e Práticas Musicais na Escola",
    authors: "Ana Rodrigues, Pedro Lima",
    type: "Artigo Científico",
    year: "2023",
    description:
      "Investigação sobre o uso de aplicativos e softwares no ensino de música em escolas públicas.",
  },
  {
    title: "Educação Musical Online: Desafios e Perspectivas",
    authors: "Giann Mendes Ribeiro",
    type: "Tese de Doutorado",
    year: "2022",
    description:
      "Estudo aprofundado sobre as práticas de ensino musical em ambientes virtuais durante a pandemia.",
  },
  {
    title: "Formação de Professores de Música no Semiárido",
    authors: "Renan Colombo Simões",
    type: "Artigo Científico",
    year: "2022",
    description:
      "Análise das políticas de formação docente para o ensino de música na região do semiárido nordestino.",
  },
];

const years = ["Todos", "2024", "2023", "2022"];
const types = ["Artigos", "Teses", "Dissertações"];

const Publicacoes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("Todos");

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === "Todos" || pub.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <PageLayout>
      <PageHero
        title="Pesquisas e Publicações"
        subtitle="Acervo de produções acadêmicas do GPPEM"
        image={publicationFeatured}
      />

      {/* Search & Filters */}
      <div className="px-4 py-4 bg-card sticky top-[60px] z-10 shadow-sm border-b border-border">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-1">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedYear === year
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {year}
              </button>
            ))}
            {types.map((type) => (
              <button
                key={type}
                className="px-4 py-1.5 bg-card border border-border text-foreground rounded-full text-xs font-medium whitespace-nowrap hover:bg-muted transition-colors"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Publications List */}
      <main className="px-4 pt-4 pb-8 space-y-4 max-w-3xl mx-auto">
        {filteredPublications.map((pub, index) => (
          <PublicationCard
            key={pub.title}
            {...pub}
            featured={index === 0 && pub.featured}
            imageUrl={index === 0 ? pub.imageUrl : undefined}
          />
        ))}

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-4xl text-muted-foreground mb-2">article</span>
            <p className="text-muted-foreground">Nenhuma publicação encontrada</p>
          </div>
        )}
      </main>
    </PageLayout>
  );
};

export default Publicacoes;