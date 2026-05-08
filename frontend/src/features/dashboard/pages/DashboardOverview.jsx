import { CalendarDays, Plus, Sparkles } from "lucide-react";
import ActionButton from "../components/ActionButton";
import StatCard from "../components/StatCard";
import SubscriptionRow from "../components/SubscriptionRow";
import {
  spendingTrend,
  statCards,
  subscriptions,
  upcomingRenewals,
} from "../data/mockDashboardData";

function DashboardOverview() {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.9fr_1fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {statCards.map((card) => (
              <StatCard key={card.id} {...card} />
            ))}
          </div>

          <article className="dashboard-card p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Spending Trend</h2>
              <span className="rounded-full border border-primary/25 bg-primary/12 px-3 py-1 text-xs font-semibold text-primary-soft">
                6 Months
              </span>
            </div>

            <div className="grid h-44 grid-cols-6 items-end gap-2 sm:gap-4">
              {spendingTrend.map((item, index) => (
                <div key={item.month} className="flex h-full flex-col justify-end gap-2">
                  <div
                    className={`w-full rounded-t-lg ${
                      index === spendingTrend.length - 1 ? "bg-primary-soft" : "bg-slate-600/60"
                    }`}
                    style={{ height: `${item.value}%` }}
                  />
                  <span className="text-center text-xs text-text-muted">{item.month}</span>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            <ActionButton>
              <Plus size={16} />
              Add New Subscription
            </ActionButton>
            <ActionButton variant="secondary">
              <Sparkles size={16} />
              Compare Plans
            </ActionButton>
          </div>
        </div>

        <aside className="dashboard-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-display text-text">Upcoming Renewals</h2>
            <CalendarDays size={18} className="text-text-muted" />
          </div>
          <div className="space-y-4">
            {upcomingRenewals.map((renewal) => (
              <article key={renewal.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-card/70 p-3">
                <div>
                  <p className="font-semibold text-text">{renewal.name}</p>
                  <p className="text-sm text-text-muted">{renewal.due}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold tabular-data text-primary-soft">{renewal.price}</p>
                  <p className="text-xs uppercase tracking-wide text-amber-300">{renewal.status}</p>
                </div>
              </article>
            ))}
          </div>
          <button className="mt-6 w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3 text-sm font-semibold text-text hover:border-primary/35 hover:text-primary-soft">
            View Full Calendar
          </button>
        </aside>
      </div>

      <section>
        <h2 className="mb-4 text-3xl font-display tracking-tight text-text">Your Subscriptions</h2>
        <div className="space-y-3">
          {subscriptions.map((subscription) => (
            <SubscriptionRow key={subscription.id} {...subscription} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default DashboardOverview;
