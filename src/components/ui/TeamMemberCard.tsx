interface TeamMemberCardProps {
  name: string;
  role: string;
  institution?: string;
  imageUrl?: string;
}

const TeamMemberCard = ({ name, role, institution, imageUrl }: TeamMemberCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-card border border-border hover:shadow-soft transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-accent overflow-hidden flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl">person</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
            {name}
          </h4>
          <p className="text-xs text-muted-foreground truncate">{role}</p>
          {institution && (
            <p className="text-[10px] text-primary font-medium mt-1">{institution}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
