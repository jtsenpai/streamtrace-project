import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

function StatCard({ title, value, delta, description }) {
  return (
    <article className="dashboard-card p-5">
      <p className="text-xs tracking-[0.16em] text-text-muted uppercase">
        {title}
      </p>
      <p className="mt-3 text-3xl font-semibold tabular-data text-primary-soft">
        {value}
      </p>
      {delta ? (
        <p className="mt-2 inline-flex items-center gap-1 text-sm text-emerald-300">
          <ArrowTrendingUpIcon className="h-4 w-4" />
          {delta}
        </p>
      ) : null}
      {description ? (
        <p className="mt-2 text-sm text-text-muted">{description}</p>
      ) : null}
    </article>
  );
}

export default StatCard;
