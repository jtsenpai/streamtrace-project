function StatusBadge({ status }) {
  const colors =
    status === "Paid"
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
      : "bg-rose-500/15 text-rose-400 border-rose-500/25";

  return (
    <span
      className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${colors}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
