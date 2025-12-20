import { Link } from "react-router-dom";

interface ResearchLineCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

const ResearchLineCard = ({ icon, title, description, href = "#" }: ResearchLineCardProps) => {
  return (
    <Link
      to={href}
      className="bg-card rounded-2xl p-5 shadow-card hover:shadow-soft transition-all cursor-pointer border border-border group"
    >
      <div className="flex items-start gap-4">
        <div className="bg-accent p-3 rounded-full flex-shrink-0 group-hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-card-foreground text-base mb-1 pr-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <span className="material-symbols-outlined text-muted-foreground text-sm mt-1 group-hover:translate-x-1 transition-transform">
              arrow_forward_ios
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResearchLineCard;
