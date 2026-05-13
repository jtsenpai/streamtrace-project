import { useState } from "react";

const imgNetflixLogo =
  "https://www.figma.com/api/mcp/asset/a0e40b8a-c645-4450-8f05-23cdf7281f10";

const AddSubscriptionForm = ({ service, onSubmit, onCancel }) => {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [renewalDate, setRenewalDate] = useState("11/24/2024");
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);

  const plans = {
    standard: {
      name: "Standard",
      description: "1080p • 2 screens",
      isActive: false,
      price: 11.99,
    },
    premium: {
      name: "Premium",
      description: "4K + HDR • 4 screens",
      isActive: true,
      price: 15.99,
    },
  };

  const currentPlan = plans[selectedPlan];

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        service: service?.name || "Netflix",
        plan: selectedPlan,
        billingCycle,
        renewalDate,
        autoPayEnabled,
        price: currentPlan.price,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/80 p-6 z-50">
      <div className="backdrop-blur-2xl bg-[rgba(30,41,59,0.7)] border border-white/10 rounded-lg shadow-xl w-full max-w-130 overflow-hidden">
        {/* Header Section */}
        <div className="bg-linear-to-b from-[rgba(229,9,20,0.06)] to-transparent pb-8 pt-12 px-12 border-b border-white/5 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-black border border-white/10 rounded-lg p-2 w-16 h-16 flex items-center justify-center shadow-lg">
              <img src={imgNetflixLogo} alt="Netflix" className="w-12 h-12" />
            </div>
          </div>

          {/* Service Title */}
          <h2 className="text-2xl font-semibold text-text mb-3 font-orbitron">
            {service?.name || "Netflix"}
          </h2>
          <p className="text-text-muted text-base">
            Configure your subscription details
          </p>
        </div>

        {/* Content Section */}
        <div className="px-12 py-12 space-y-8">
          {/* Plan Selection */}
          <div>
            <label className="block text-text-muted text-sm font-medium uppercase tracking-wider mb-4">
              Select Plan
            </label>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(plans).map(([key, plan]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  className={`p-6 rounded-lg text-left transition-all relative overflow-hidden ${
                    selectedPlan === key
                      ? "bg-blue-500/10 border-2 border-blue-500"
                      : "bg-surface-high border border-outline"
                  }`}
                >
                  {plan.isActive && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-blue-900 text-xs font-medium px-3 py-1">
                      ACTIVE
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-text font-orbitron mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-muted text-xs">{plan.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Billing & Price */}
          <div className="flex items-end justify-between gap-8">
            <div className="flex-1">
              <label className="block text-text-muted text-sm font-medium uppercase tracking-wider mb-4">
                Billing Cycle
              </label>
              <div className="flex gap-1 p-1 bg-background rounded-full border border-outline/30">
                {["monthly", "yearly"].map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setBillingCycle(cycle)}
                    className={`flex-1 py-2 rounded-full transition-all font-medium text-sm ${
                      billingCycle === cycle
                        ? "bg-surface-high text-primary-soft"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    {cycle === "monthly" ? "Monthly" : "Yearly"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-text-muted text-xs font-semibold mb-2">
                Current Price
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-primary-soft font-orbitron">
                  ${currentPlan.price}
                </span>
                <span className="text-base text-text-muted font-orbitron">
                  /mo
                </span>
              </div>
            </div>
          </div>

          {/* Date & Settings */}
          <div className="grid grid-cols-2 gap-8">
            {/* Renewal Date */}
            <div>
              <label className="block text-text-muted text-sm font-medium uppercase tracking-wider mb-4">
                Next Renewal Date
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={renewalDate}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  className="input-cinema flex-1"
                />
              </div>
            </div>

            {/* Auto-Pay Toggle */}
            <div>
              <label className="block text-text-muted text-sm font-medium uppercase tracking-wider mb-4">
                Auto-Pay
              </label>
              <div className="flex items-center gap-3 bg-surface-high p-4 rounded-lg border border-outline">
                <div className="flex-1 flex items-center gap-3">
                  <span>♻</span>
                  <span className="text-text-muted text-sm">Auto-Pay</span>
                </div>
                <button
                  onClick={() => setAutoPayEnabled(!autoPayEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    autoPayEnabled ? "bg-blue-500" : "bg-outline"
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      autoPayEnabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="border-t border-white/5 px-12 py-6 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="text-text-muted hover:text-text transition-colors font-medium"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span>🔒</span>
            <span>Encryption secured by SubStream Sentinel</span>
          </div>
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Confirm Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubscriptionForm;
