const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-2xl leading-none font-semibold tracking-tight ${className}`}
  >
    {children}
  </h3>
);

export default CardTitle;
