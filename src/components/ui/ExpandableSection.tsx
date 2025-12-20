import { useState } from "react";

interface ExpandableSectionProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const ExpandableSection = ({ icon, title, children, defaultOpen = false }: ExpandableSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-lg">{icon}</span>
          </div>
          <span className="font-semibold text-card-foreground">{title}</span>
        </div>
        <span
          className={`material-symbols-outlined text-muted-foreground group-hover:text-primary transition-all ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-4 animate-fade-in">
          <div className="pt-2 border-t border-border">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;
