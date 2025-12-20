import { Link } from "react-router-dom";

interface QuickAccessCardProps {
  href: string;
  icon: string;
  bgIcon?: string;
  title: string;
  subtitle: string;
}

const QuickAccessCard = ({ href, icon, bgIcon, title, subtitle }: QuickAccessCardProps) => {
  return (
    <Link
      to={href}
      className="group relative flex flex-col p-6 bg-card rounded-2xl border border-border shadow-card overflow-hidden min-h-[180px] active:scale-[0.98] hover:shadow-soft transition-all"
    >
      {/* Background Icon */}
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
        <span className="material-symbols-outlined text-8xl text-primary">
          {bgIcon || icon}
        </span>
      </div>

      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-primary mb-auto">
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-4">
        <h4 className="text-lg font-bold mb-1 text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>
      </div>
    </Link>
  );
};

export default QuickAccessCard;
