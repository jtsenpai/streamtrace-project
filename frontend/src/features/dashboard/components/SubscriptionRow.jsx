import { CalendarClock, MoreVertical } from "lucide-react";

function SubscriptionRow({ name, plan, nextBill, price, accent }) {
  return (
    <article className="dashboard-card flex items-center justify-between gap-4 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="inline-block h-11 w-11 shrink-0 rounded-xl border border-white/10"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-text">{name}</p>
          <p className="truncate text-sm text-text-muted">{plan}</p>
        </div>
      </div>
      <div className="hidden items-center gap-2 text-sm text-text-muted md:flex">
        <CalendarClock size={16} />
        <span>{nextBill}</span>
      </div>
      <p className="min-w-[80px] text-right text-lg font-semibold tabular-data text-primary-soft">
        {price}
      </p>
      <button className="icon-button" aria-label={`More options for ${name}`}>
        <MoreVertical size={16} />
      </button>
    </article>
  );
}

export default SubscriptionRow;
