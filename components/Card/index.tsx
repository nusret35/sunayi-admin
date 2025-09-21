const Card = ({ children, className = "" }) => (
  <div
    className={`bg-card text-card-foreground rounded-lg border shadow-sm ${className}`}
  >
    {children}
  </div>
);

export default Card;
