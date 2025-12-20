interface EventCardProps {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  featured?: boolean;
}

const EventCard = ({
  title,
  date,
  time,
  location,
  description,
  imageUrl,
  featured = false,
}: EventCardProps) => {
  if (featured) {
    return (
      <article className="bg-card rounded-2xl shadow-card overflow-hidden border border-border group">
        {imageUrl && (
          <div className="relative h-48">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-full mb-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                Próximo Evento
              </span>
              <h2 className="text-lg font-bold text-primary-foreground">{title}</h2>
            </div>
          </div>
        )}
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-lg text-primary">calendar_today</span>
              <span className="font-medium">{date}</span>
            </div>
            {time && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg text-primary">schedule</span>
                <span>{time}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg text-primary">location_on</span>
                <span>{location}</span>
              </div>
            )}
          </div>
          {description && (
            <p className="text-xs text-card-foreground leading-relaxed line-clamp-2">{description}</p>
          )}
          <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
            <span>Ver Detalhes</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-card rounded-2xl p-4 shadow-card border border-border group hover:shadow-soft transition-all">
      <div className="flex gap-4">
        <div className="flex flex-col items-center justify-center w-14 h-14 bg-accent rounded-xl flex-shrink-0">
          <span className="text-lg font-bold text-primary leading-none">{date.split("/")[0]}</span>
          <span className="text-[10px] text-muted-foreground uppercase">{date.split("/")[1]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-card-foreground text-sm mb-1 truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          {location && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {location}
            </p>
          )}
          {time && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {time}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default EventCard;
