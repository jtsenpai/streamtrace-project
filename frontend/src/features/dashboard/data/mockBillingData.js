export const billingTransactions = [
  {
    id: "txn-1",
    date: "Oct 24, 2023",
    service: "Netflix",
    plan: "Premium 4K + HDR",
    amount: 19.99,
    status: "Paid",
    accent: "#e50914",
    icon: "▶",
  },
  {
    id: "txn-2",
    date: "Oct 18, 2023",
    service: "Spotify",
    plan: "Family Plan",
    amount: 16.99,
    status: "Paid",
    accent: "#1db954",
    icon: "♪",
  },
  {
    id: "txn-3",
    date: "Oct 12, 2023",
    service: "Amazon Prime",
    plan: "Annual Membership",
    amount: 139.0,
    status: "Pending",
    accent: "#ff9900",
    icon: "▣",
  },
  {
    id: "txn-4",
    date: "Sep 28, 2023",
    service: "Adobe CC",
    plan: "All Apps Individual",
    amount: 54.99,
    status: "Paid",
    accent: "#1473e6",
    icon: "△",
  },
  {
    id: "txn-5",
    date: "Sep 24, 2023",
    service: "Netflix",
    plan: "Premium 4K + HDR",
    amount: 19.99,
    status: "Paid",
    accent: "#e50914",
    icon: "▶",
  },
];

export const billingStats = {
  totalSpentThisYear: "$1,482.50",
};

export const billingInfoCards = [
  {
    id: "tax-ready",
    title: "Tax Ready",
    description:
      "Export all your subscription receipts for the current fiscal year in one click.",
    action: "Bulk Export CSV",
    actionIcon: "→",
    gradient: "from-emerald-500/15 to-emerald-900/10",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "upcoming-charges",
    title: "Upcoming Charges",
    description:
      "You have 3 renewals scheduled for next week totaling $45.80.",
    action: "View Schedule",
    actionIcon: "📅",
    gradient: "from-sky-500/15 to-sky-900/10",
    borderColor: "border-sky-500/30",
  },
  {
    id: "card-expiring",
    title: "Card Expiring",
    description:
      "Your primary Visa ending in 4242 expires next month. Update now to avoid service interruption.",
    action: "Update Payment",
    actionIcon: "💳",
    gradient: "from-rose-500/15 to-rose-900/10",
    borderColor: "border-rose-500/30",
  },
];

export const totalTransactions = 42;
export const transactionsPerPage = 5;
