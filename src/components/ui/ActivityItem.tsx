interface ActivityItemProps {
  type: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
}

const ActivityItem = ({ type, title, subtitle, imageUrl }: ActivityItemProps) => {
  return (
    <div className="flex gap-4 items-center py-4 border-b border-border last:border-0 last:pb-0 group cursor-pointer">
      <div className="w-16 h-16 rounded-xl bg-muted shrink-0 overflow-hidden relative shadow-sm">
        {imageUrl ? (
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
            src={imageUrl}
            alt=""
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-muted-foreground">article</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] uppercase font-bold text-secondary mb-1 block tracking-wide">
          {type}
        </span>
        <h4 className="text-sm font-bold leading-tight mb-1 truncate text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
