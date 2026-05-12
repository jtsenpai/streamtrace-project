function ActionButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const variantClass =
    variant === "primary"
      ? "btn-primary-cinema"
      : "border border-white/12 bg-card text-text hover:border-primary/35 hover:text-primary-soft";

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${variantClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default ActionButton;
