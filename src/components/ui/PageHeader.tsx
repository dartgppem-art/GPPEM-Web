interface PageHeaderProps {
  tag?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
}

const PageHeader = ({ tag, title, description, backgroundImage }: PageHeaderProps) => {
  return (
    <div className="relative w-full h-56 lg:h-72 overflow-hidden">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary/30" />
      <div className="absolute inset-0 flex flex-col justify-end px-6 py-6 lg:px-8 lg:py-8">
        {tag && (
          <span className="text-xs font-semibold text-primary-foreground uppercase tracking-wider mb-2 opacity-80 bg-primary/80 w-max px-2 py-0.5 rounded">
            {tag}
          </span>
        )}
        <h1 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-1">
          {title}
        </h1>
        {description && (
          <p className="text-primary-foreground/80 text-sm lg:text-base mt-1 max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
