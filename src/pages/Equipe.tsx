import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import TeamMemberCard from "@/components/ui/TeamMemberCard";
// IMPORT ATUALIZADO:
import heroEquipe from "@/assets/hero-equipe.jpg";

const coordination = [
  {
    name: "Prof. Dr. Giann Mendes Ribeiro",
    role: "Coordenador",
    institution: "DART/UERN",
  },
  {
    name: "Prof. Dr. Renan Colombo Simões",
    role: "Vice-Coordenador",
    institution: "DART/UERN",
  },
];

const researchers = [
  {
    name: "Profa. Dra. Maria Helena Santos",
    role: "Pesquisadora",
    institution: "DART/UERN",
  },
  {
    name: "Prof. Dr. Carlos Eduardo Lima",
    role: "Pesquisador",
    institution: "DART/UERN",
  },
  {
    name: "Profa. Ms. Ana Paula Rodrigues",
    role: "Pesquisadora",
    institution: "DART/UERN",
  },
  {
    name: "Prof. Ms. Pedro Henrique Souza",
    role: "Pesquisador",
    institution: "DART/UERN",
  },
  {
    name: "Profa. Esp. Juliana Costa",
    role: "Pesquisadora",
    institution: "DART/UERN",
  },
  {
    name: "Prof. Dr. Marcos Antônio Silva",
    role: "Pesquisador Colaborador",
    institution: "UFRN",
  },
];

const students = [
  {
    name: "Lucas Oliveira",
    role: "Mestrando",
    institution: "PPGMúsica/UERN",
  },
  {
    name: "Fernanda Almeida",
    role: "Mestranda",
    institution: "PPGMúsica/UERN",
  },
  {
    name: "Rafael Santos",
    role: "Bolsista IC",
    institution: "DART/UERN",
  },
  {
    name: "Camila Ferreira",
    role: "Bolsista IC",
    institution: "DART/UERN",
  },
];

const Equipe = () => {
  return (
    <PageLayout>
      <PageHero
        title="Nossa Equipe"
        subtitle="Conheça os membros do GPPEM"
        image={heroEquipe} // Imagem específica
      />

      <main className="px-4 pt-6 pb-8 space-y-8 max-w-3xl mx-auto">
        {/* Coordination */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">star</span>
            <h2 className="text-lg font-bold text-foreground">Coordenação</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {coordination.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </section>

        {/* Researchers */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">science</span>
            <h2 className="text-lg font-bold text-foreground">Pesquisadores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {researchers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </section>

        {/* Students */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">school</span>
            <h2 className="text-lg font-bold text-foreground">Discentes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {students.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <div className="gradient-card rounded-2xl p-5 shadow-lg relative overflow-hidden text-primary-foreground">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-foreground opacity-10 rounded-full"></div>
          <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-primary-foreground opacity-10 rounded-full"></div>
          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">Faça parte</span>
            <h3 className="text-xl font-bold">Junte-se ao GPPEM</h3>
            <p className="text-xs opacity-90 max-w-[80%] mb-3">
              Interessado em fazer parte do nosso grupo de pesquisa? Entre em contato conosco.
            </p>
            <a
              href="/contato"
              className="self-end bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
            >
              Contato <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Equipe;