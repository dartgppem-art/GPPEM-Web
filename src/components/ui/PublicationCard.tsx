interface PublicationCardProps {
  title: string;
  authors: string;
  type: string;
  year: string;
  description?: string;
  imageUrl?: string;
  featured?: boolean;
}

const PublicationCard = ({
  title,
  authors,
  type,
  year,
  description,
  imageUrl,
  featured = false,
}: PublicationCardProps) => {
  if (featured) {
    return (
      <article className="bg-card rounded-2xl shadow-card overflow-hidden border border-border group">
        {imageUrl && (
          <div className="relative h-40">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-[10px] font-bold rounded uppercase tracking-wider">
                Destaque {year}
              </span>
            </div>
          </div>
        )}
        <div className="p-4">
          <h2 className="text-base font-bold text-primary mb-2 leading-tight group-hover:text-secondary transition-colors">
            {title}
          </h2>
          <div className="flex items-center space-x-2 mb-3">
            <span className="material-symbols-outlined text-muted-foreground text-sm">people</span>
            <span className="text-xs text-muted-foreground font-medium">{authors}</span>
          </div>
          {description && (
            <p className="text-xs text-card-foreground leading-relaxed mb-4 line-clamp-3">
              {description}
            </p>
          )}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wide">{type}</span>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-accent text-primary rounded-lg text-xs font-semibold hover:bg-primary/10 transition-colors">
              <span>Ler resumo</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-card rounded-2xl p-4 shadow-card border border-border relative group hover:shadow-soft transition-all">
      <button className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">bookmark_border</span>
      </button>
      <div className="flex items-center space-x-2 mb-2">
        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-bold rounded">{year}</span>
      </div>
      <h3 className="text-sm font-bold text-card-foreground mb-1 pr-8 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-[10px] text-muted-foreground mb-2 italic">
        {authors} • {type}
      </p>
      {description && (
        <p className="text-xs text-card-foreground leading-relaxed line-clamp-2">{description}</p>
      )}
    </article>
  );
};

export default PublicationCard;
