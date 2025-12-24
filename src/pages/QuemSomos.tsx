import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero"; // Ajuste o caminho se necessário
import ExpandableSection from "@/components/ui/ExpandableSection";
import heroImage from "@/assets/hero-music-education.jpg";

const QuemSomos = () => {
  return (
    <PageLayout>
      <PageHero
        title="Quem Somos"
        subtitle="Perspectivas em Educação Musical"
        image={heroImage}
      />

      <div className="px-5 py-6 space-y-6 lg:max-w-6xl mx-auto">
        {/* Introduction Card */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-5 animate-slide-up">
          <p className="text-sm leading-relaxed text-muted-foreground">
            O <span className="text-primary font-semibold">Grupo de Pesquisa Perspectivas em Educação Musical (GPPEM)</span> dedica-se ao estudo aprofundado e ao desenvolvimento de práticas pedagógicas no âmbito da Universidade do Estado do Rio Grande do Norte (UERN).
          </p>
        </div>

        {/* Expandable Sections - Mantidas Intactas */}
        <div className="space-y-3">
          <ExpandableSection icon="flag" title="Nossa Missão" defaultOpen>
            <p className="text-sm text-muted-foreground leading-relaxed pt-3">
              Promover pesquisas de excelência no campo da educação musical, contribuindo para a formação de educadores musicais qualificados e para o desenvolvimento de metodologias inovadoras de ensino da música em diversos contextos educacionais.
            </p>
          </ExpandableSection>

          <ExpandableSection icon="visibility" title="Nossa Visão">
            <p className="text-sm text-muted-foreground leading-relaxed pt-3">
              Ser referência nacional e internacional em pesquisa sobre educação musical, especialmente no que tange às práticas pedagógicas mediadas por tecnologias e aos processos de ensino-aprendizagem da música em ambientes online e híbridos.
            </p>
          </ExpandableSection>

          <ExpandableSection icon="diamond" title="Nossos Valores">
            <ul className="text-sm text-muted-foreground leading-relaxed pt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Excelência acadêmica e rigor científico</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Inovação e criatividade nas práticas pedagógicas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Compromisso com a formação humana integral</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                <span>Colaboração e trabalho em equipe</span>
              </li>
            </ul>
          </ExpandableSection>
        </div>

        {/* History Section */}
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary">history_edu</span>
            <h2 className="text-lg font-bold text-foreground">Nossa História</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Fundado em 2010, o GPPEM nasceu da necessidade urgente de estruturar a pesquisa acadêmica em música dentro da UERN. Inicialmente formado por um pequeno grupo de docentes entusiastas, o projeto cresceu exponencialmente ao longo da última década.
            </p>
            <p>
              Hoje, o grupo é responsável por dezenas de publicações anuais e mantém parcerias estratégicas com instituições de ensino em todo o Nordeste, impactando diretamente a formação continuada de professores no semiárido potiguar.
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-4 gradient-card rounded-2xl p-5 shadow-lg relative overflow-hidden text-primary-foreground">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-foreground opacity-10 rounded-full"></div>
          <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-primary-foreground opacity-10 rounded-full"></div>
          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">Explore</span>
            <h3 className="text-xl font-bold">Linhas de Pesquisa</h3>
            <p className="text-xs opacity-90 max-w-[80%] mb-3">
              Descubra os eixos temáticos e projetos em andamento.
            </p>
            <Link
              to="/linhas-de-pesquisa"
              className="self-end bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
            >
              Ver Mais <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default QuemSomos;