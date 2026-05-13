import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  PrinterIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import StatusBadge from "../../../components/StatusBadge";
import ServiceIcon from "../../../components/ServiceIcon";
import Modal from "../../../components/Modal";
import ActionButton from "../components/ActionButton";
import {
  billingInfoCards,
  billingStats,
  billingTransactions,
  totalTransactions,
  transactionsPerPage,
} from "../data/mockBillingData";

/* ── helpers ──────────────────────────────────────────────── */

/* ── page ─────────────────────────────────────────────────── */

function BillingHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState(null);

  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

  const handleViewInvoice = (txn) => {
    setSelectedTxn(txn);
    setIsInvoiceModalOpen(true);
  };

  return (
    <section className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-h1 text-text">Billing History</h1>
          <p className="mt-1 text-text-muted">
            View and download your past subscription invoices.
          </p>
        </div>

        {/* Total spent card */}
        <div className="dashboard-card flex items-center gap-4 px-6 py-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <CurrencyDollarIcon className="w-6 h-6" />
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

      {/* Transactions table */}
      <div className="dashboard-card overflow-x-auto">
        <table className="w-full min-w-170 text-sm">
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
                    onClick={() => handleViewInvoice(txn)}
                    className={`icon-button mx-auto ${
                      txn.status === "Pending"
                        ? "pointer-events-none opacity-30"
                        : ""
                    }`}
                    aria-label={`View invoice for ${txn.service}`}
                    disabled={txn.status === "Pending"}
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
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
              <ChevronLeftIcon className="w-4 h-4" />
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* info cards row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {billingInfoCards.map((card) => (
          <div
            key={card.id}
            className={`rounded-xl border bg-linear-to-br p-5 ${card.borderColor} ${card.gradient}`}
          >
            <h3 className="text-lg font-display text-text">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {card.description}
            </p>
            <button
              onClick={() => setActiveInfoModal(card)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-soft transition hover:text-primary"
            >
              {card.action}{" "}
              {typeof card.actionIcon === "string" ? (
                <span aria-hidden="true">{card.actionIcon}</span>
              ) : (
                <card.actionIcon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        ))}
      </div>
      {/* Modals */}
      <Modal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        title="Invoice Preview"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <ServiceIcon
                accent={selectedTxn?.accent}
                icon={selectedTxn?.icon}
              />
              <div>
                <p className="font-semibold text-text">
                  {selectedTxn?.service}
                </p>
                <p className="text-xs text-text-muted">
                  Transaction ID: {selectedTxn?.id}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-text">
                {selectedTxn?.date}
              </p>
              <StatusBadge status={selectedTxn?.status} />
            </div>
          </div>

          <div className="space-y-4 rounded-xl bg-white/2 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">
                {selectedTxn?.plan} Subscription
              </span>
              <span className="font-medium text-text">
                ${selectedTxn?.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Tax (0%)</span>
              <span className="font-medium text-text">$0.00</span>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-3 text-base font-semibold">
              <span className="text-text">Total</span>
              <span className="text-primary-soft">
                ${selectedTxn?.amount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/4 p-3 transition hover:border-primary/40 hover:bg-primary/10">
              <PrinterIcon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Print
              </span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/4 p-3 transition hover:border-primary/40 hover:bg-primary/10">
              <ShareIcon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Share
              </span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/4 p-3 transition hover:border-primary/40 hover:bg-primary/10">
              <ArrowDownTrayIcon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Save PDF
              </span>
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
        title={activeInfoModal?.title}
      >
        <div className="space-y-6 text-center py-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <DocumentTextIcon className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-text">
              {activeInfoModal?.action}
            </h4>
            <p className="text-text-muted leading-relaxed">
              This feature is being prepared. You'll soon be able to{" "}
              {activeInfoModal?.description.toLowerCase()}
            </p>
          </div>
          <div className="pt-4">
            <ActionButton
              variant="primary"
              className="w-full"
              onClick={() => setActiveInfoModal(null)}
            >
              Notify Me When Ready
            </ActionButton>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default BillingHistoryPage;
