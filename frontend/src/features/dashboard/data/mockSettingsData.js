export const userProfile = {
  displayName: "Alex Rivera",
  email: "alex.rivera@substream.io",
  avatarUrl: null,
};

export const paymentMethods = [
  {
    id: "pm-1",
    type: "Visa",
    lastFour: "4242",
    expiry: "12/26",
    isPrimary: true,
  },
  {
    id: "pm-2",
    type: "Mastercard",
    lastFour: "8891",
    expiry: "05/25",
    isPrimary: false,
  },
];

export const notificationPreferences = [
  {
    id: "upcoming-renewals",
    label: "Upcoming Renewals",
    description:
      "Receive an alert 48 hours before any subscription is scheduled to renew.",
    enabled: true,
  },
  {
    id: "price-change-alerts",
    label: "Price Change Alerts",
    description:
      "Get notified immediately if a service you subscribe to changes its monthly rate.",
    enabled: true,
  },
  {
    id: "marketing-emails",
    label: "Marketing Emails",
    description:
      "Occasional updates about new SubStream features and partner offers.",
    enabled: false,
  },
];
