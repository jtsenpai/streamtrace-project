import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Download,
} from "lucide-react";
import {
  billingInfoCards,
  billingStats,
  billingTransactions,
  totalTransactions,
  transactionsPerPage,
} from "../data/mockBillingData";

/* ── helpers ──────────────────────────────────────────────── */

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

function ServiceIcon({ accent, icon }) {
  return (
    <span
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm"
      style={{ backgroundColor: accent }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}

/* ── page ─────────────────────────────────────────────────── */

function BillingHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

  return (
    <section className="space-y-6">
      {/* header row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-h1 text-text">Billing History</h1>
          <p className="mt-1 text-text-muted">
            View and download your past subscription invoices.
          </p>
        </div>

        {/* total spent card */}
        <div className="dashboard-card flex items-center gap-4 px-6 py-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <CircleDollarSign size={22} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              Total Spent This Year
            </p>
            <p className="text-3xl font-display tabular-data text-primary-soft">
              {billingStats.totalSpentThisYear}
            </p>
          </div>
        </div>
      </div>

      {/* transactions table */}
      <div className="dashboard-card overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-xs uppercase tracking-wider text-text-muted">
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Service</th>
              <th className="px-5 py-4 font-semibold">Plan</th>
              <th className="px-5 py-4 font-semibold">Amount</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold text-center">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {billingTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b border-white/5 transition hover:bg-white/3"
              >
                <td className="px-5 py-4 text-text-muted">{txn.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <ServiceIcon accent={txn.accent} icon={txn.icon} />
                    <span className="font-medium text-text">{txn.service}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-text-muted">{txn.plan}</td>
                <td className="px-5 py-4 font-semibold tabular-data text-text">
                  ${txn.amount.toFixed(2)}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={txn.status} />
                </td>
                <td className="px-5 py-4 text-center">
                  <button
                    className={`icon-button mx-auto ${
                      txn.status === "Pending"
                        ? "pointer-events-none opacity-30"
                        : ""
                    }`}
                    aria-label={`Download invoice for ${txn.service}`}
                    disabled={txn.status === "Pending"}
                  >
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
        <div className="flex items-center justify-between border-t border-white/8 px-5 py-4">
          <p className="text-xs text-primary-soft">
            Showing 1 to {transactionsPerPage} of {totalTransactions}{" "}
            transactions
          </p>
          <div className="flex items-center gap-1">
            <button
              className="icon-button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                  currentPage === page
                    ? "bg-primary text-background"
                    : "text-text-muted hover:bg-white/8 hover:text-text"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              className="icon-button"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* info cards row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {billingInfoCards.map((card) => (
          <div
            key={card.id}
            className={`rounded-xl border bg-gradient-to-br p-5 ${card.borderColor} ${card.gradient}`}
          >
            <h3 className="text-lg font-display text-text">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {card.description}
            </p>
            <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-soft transition hover:text-primary">
              {card.action}{" "}
              <span aria-hidden="true">{card.actionIcon}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BillingHistoryPage;
