interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
}

const PageHero = ({ title, subtitle, image }: PageHeroProps) => {
  return (
    // AJUSTE 1: Adicionado 'group' para controlar o hover e 'cursor-default'
    <section className="relative w-full h-[150px] lg:h-[200px] overflow-hidden animate-hero shadow-sm group cursor-default">

      {/* AJUSTE 2: Adicionado 'transition-transform duration-700 group-hover:scale-105'
        Isso cria o efeito de movimento (zoom suave) quando o usuário passa o mouse na seção.
      */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Gradiente Angular (Mantido) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-start px-6 pt-8 lg:pt-10 max-w-5xl mx-auto text-primary-foreground">
        <h1 className="text-xl lg:text-3xl font-bold animate-hero-title leading-none mb-1">
          {title}
        </h1>

        {subtitle && (
          <p className="text-[10px] lg:text-sm max-w-2xl text-primary-foreground/90 animate-hero-subtitle font-light opacity-90 line-clamp-1 lg:line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;