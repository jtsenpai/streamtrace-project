import { useState } from "react";
import {
  CalendarClock,
  DollarSign,
  PiggyBank,
  Plus,
  TriangleAlert,
  Edit2,
  Trash2,
  Pause,
} from "lucide-react";
import Modal from "../../../components/Modal";
import AddSubscriptionForm from "../components/AddSubscriptionForm";
import ActionButton from "../components/ActionButton";
import {
  subscriptionCategories,
  subscriptionsList,
  subscriptionStats,
} from "../data/mockSubscriptionsData";

/* ── tiny helpers ─────────────────────────────────────────── */

const categoryColors = {
  Video: "bg-red-500/15 text-red-400 border-red-500/25",
  Music: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Software: "bg-sky-500/15 text-sky-400 border-sky-500/25",
  Gaming: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  Cloud: "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

function CategoryBadge({ category }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${
        categoryColors[category] ?? "bg-white/10 text-text-muted border-white/10"
      }`}
    >
      {category}
    </span>
  );
}

function ServiceIcon({ accent, icon }) {
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
      style={{ backgroundColor: accent }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}

/* ── page ─────────────────────────────────────────────────── */

function SubscriptionsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const filtered =
    activeCategory === "All"
      ? subscriptionsList
      : subscriptionsList.filter((s) => s.category === activeCategory);

  const handleManage = (sub) => {
    setSelectedSubscription(sub);
    setIsManageModalOpen(true);
  };

  return (
    <section className="space-y-6">
      {/* header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h1 text-text">Your Subscriptions</h1>
          <p className="mt-1 text-text-muted">
            Manage and track your {subscriptionsList.length} active services.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary-cinema inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition"
        >
          <Plus size={16} />
          Add Subscription
        </button>
      </div>

      {/* category filter pills */}
      <div className="flex flex-wrap gap-2">
        {subscriptionCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === cat
                ? "border-primary/40 bg-primary/15 text-primary-soft"
                : "border-white/10 bg-white/4 text-text-muted hover:border-white/20 hover:text-text"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* table */}
      <div className="dashboard-card overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-xs uppercase tracking-wider text-text-muted">
              <th className="px-5 py-4 font-semibold">Service</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Billing</th>
              <th className="px-5 py-4 font-semibold">Price</th>
              <th className="px-5 py-4 font-semibold">Next Renewal</th>
              <th className="px-5 py-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-white/5 transition hover:bg-white/3"
              >
                {/* service */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <ServiceIcon accent={sub.accent} icon={sub.icon} />
                    <div>
                      <p className="font-semibold text-text">{sub.name}</p>
                      <p
                        className={`text-xs ${
                          sub.status === "paused"
                            ? "font-semibold uppercase text-red-400"
                            : "text-text-muted"
                        }`}
                      >
                        {sub.plan}
                      </p>
                    </div>
                  </div>
                </td>

                {/* category */}
                <td className="px-5 py-4">
                  <CategoryBadge category={sub.category} />
                </td>

                {/* billing */}
                <td className="px-5 py-4 text-text-muted">{sub.billing}</td>

                {/* price */}
                <td className="px-5 py-4">
                  <span
                    className={`text-lg font-semibold tabular-data ${
                      sub.status === "paused"
                        ? "text-text-muted line-through"
                        : "text-text"
                    }`}
                  >
                    ${sub.price.toFixed(2)}
                  </span>
                </td>

                {/* renewal */}
                <td className="px-5 py-4">
                  {sub.status === "paused" ? (
                    <span className="italic text-text-muted">Suspended</span>
                  ) : (
                    <div>
                      <p className="text-text">{sub.nextRenewal}</p>
                      <p className="text-xs text-text-muted">{sub.daysUntil}</p>
                    </div>
                  )}
                </td>

                {/* action */}
                <td className="px-5 py-4 text-center">
                  {sub.status === "paused" ? (
                    <button className="rounded-lg border border-primary/40 bg-primary/12 px-4 py-1.5 text-xs font-semibold text-primary-soft transition hover:bg-primary/20">
                      Resume
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleManage(sub)}
                      className="rounded-lg border border-white/12 bg-white/4 px-4 py-1.5 text-xs font-semibold text-text-muted transition hover:border-white/25 hover:text-text"
                    >
                      Manage
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* bottom stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* total monthly */}
        <div className="dashboard-card flex items-center gap-4 p-5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
            <DollarSign size={20} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              Total Monthly
            </p>
            <p className="text-2xl font-display tabular-data text-text">
              {subscriptionStats.totalMonthly}
            </p>
          </div>
        </div>

        {/* expiring soon */}
        <div className="dashboard-card flex items-center gap-4 p-5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
            <TriangleAlert size={20} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              Expiring Soon
            </p>
            <p className="text-2xl font-display tabular-data text-text">
              {subscriptionStats.expiringSoon}
            </p>
          </div>
        </div>

        {/* potential savings */}
        <div className="dashboard-card flex items-center gap-4 p-5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
            <PiggyBank size={20} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              Potential Savings
            </p>
            <p className="text-2xl font-display tabular-data text-text">
              {subscriptionStats.potentialSavings}
            </p>
          </div>
        </div>
      </div>

      {/* floating add button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="btn-primary-cinema fixed bottom-8 right-8 z-30 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-primary/30 transition hover:scale-105"
        aria-label="Add subscription"
      >
        <Plus size={24} />
      </button>

      {/* Modals */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Subscription"
      >
        <AddSubscriptionForm onSubmit={() => setIsAddModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        title={`Manage ${selectedSubscription?.name}`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/2 p-4">
            <ServiceIcon accent={selectedSubscription?.accent} icon={selectedSubscription?.icon} />
            <div>
              <p className="font-semibold text-text">{selectedSubscription?.name}</p>
              <p className="text-sm text-text-muted">{selectedSubscription?.plan}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-lg font-semibold text-primary-soft">${selectedSubscription?.price.toFixed(2)}</p>
              <p className="text-xs text-text-muted">{selectedSubscription?.billing}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/4 p-4 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary-soft">
              <Edit2 size={20} />
              <span className="text-xs font-medium">Edit Details</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/4 p-4 transition hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400">
              <Pause size={20} />
              <span className="text-xs font-medium">Pause Service</span>
            </button>
          </div>

          <div className="border-t border-white/5 pt-4">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/8 p-3 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/15">
              <Trash2 size={16} />
              Cancel Subscription
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default SubscriptionsPage;
