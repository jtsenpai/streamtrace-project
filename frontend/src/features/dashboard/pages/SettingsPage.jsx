import { useState } from "react";
import {
  AlertTriangle,
  CreditCard,
  Pencil,
  Plus,
  Bell,
  Trash2,
  User,
} from "lucide-react";
import {
  notificationPreferences as defaultPrefs,
  paymentMethods,
  userProfile,
} from "../data/mockSettingsData";

/* ── toggle switch ────────────────────────────────────────── */

function Toggle({ enabled, onToggle }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors ${
        enabled
          ? "border-primary/40 bg-primary"
          : "border-white/15 bg-white/10"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5.5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* ── section wrapper ──────────────────────────────────────── */

function SettingsSection({ icon: Icon, title, action, children }) {
  return (
    <div className="dashboard-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <Icon size={18} className="text-primary" />
          <h2 className="text-lg font-display text-text">{title}</h2>
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────── */

function SettingsPage() {
  const [prefs, setPrefs] = useState(defaultPrefs);

  function handleToggle(id) {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      {/* page title */}
      <div>
        <h1 className="text-h1 text-text">Account Settings</h1>
        <p className="mt-1 text-text-muted">
          Manage your profile information, payment preferences, and notification
          alerts.
        </p>
      </div>

      {/* ── profile settings ──────────────────────────────── */}
      <SettingsSection icon={User} title="Profile Settings">
        {/* avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-2xl font-semibold text-primary-soft">
              {userProfile.displayName.charAt(0)}
            </div>
            <button
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-primary text-background"
              aria-label="Edit avatar"
            >
              <Pencil size={12} />
            </button>
          </div>
          <div>
            <p className="font-semibold text-text">Profile Picture</p>
            <p className="text-xs text-text-muted">
              JPG, GIF or PNG. Max size 2MB.
            </p>
          </div>
        </div>

        {/* display name */}
        <div className="mt-6">
          <label
            htmlFor="display-name"
            className="mb-1.5 block text-sm text-text-muted"
          >
            Display Name
          </label>
          <input
            id="display-name"
            className="input-cinema"
            defaultValue={userProfile.displayName}
          />
        </div>

        {/* email */}
        <div className="mt-5">
          <label
            htmlFor="email-address"
            className="mb-1.5 block text-sm text-text-muted"
          >
            Email Address
          </label>
          <input
            id="email-address"
            type="email"
            className="input-cinema"
            defaultValue={userProfile.email}
          />
        </div>
      </SettingsSection>

      {/* ── payment methods ───────────────────────────────── */}
      <SettingsSection
        icon={CreditCard}
        title="Payment Methods"
        action={
          <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-soft transition hover:text-primary">
            <Plus size={14} />
            Add New
          </button>
        }
      >
        <div className="space-y-3">
          {paymentMethods.map((pm) => (
            <div
              key={pm.id}
              className="flex items-center justify-between rounded-xl border border-white/8 bg-background/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/8 text-text-muted">
                  <CreditCard size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">
                    {pm.type} ending in {pm.lastFour}
                  </p>
                  <p className="text-xs text-text-muted">
                    Expires {pm.expiry}
                    {pm.isPrimary && " • Default"}
                  </p>
                </div>
              </div>

              {pm.isPrimary ? (
                <span className="rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-soft">
                  Primary
                </span>
              ) : (
                <button
                  className="icon-button text-text-muted hover:text-rose-400"
                  aria-label={`Remove ${pm.type} ending in ${pm.lastFour}`}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* ── notification preferences ──────────────────────── */}
      <SettingsSection icon={Bell} title="Notification Preferences">
        <div className="space-y-5">
          {prefs.map((pref) => (
            <div
              key={pref.id}
              className="flex items-start justify-between gap-4"
            >
              <div>
                <p className="text-sm font-semibold text-text">{pref.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-text-muted">
                  {pref.description}
                </p>
              </div>
              <Toggle
                enabled={pref.enabled}
                onToggle={() => handleToggle(pref.id)}
              />
            </div>
          ))}
        </div>

        {/* action buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="rounded-xl border border-white/12 bg-white/4 px-6 py-2.5 text-sm font-semibold text-text-muted transition hover:border-white/25 hover:text-text">
            Discard Changes
          </button>
          <button className="btn-primary-cinema rounded-xl px-6 py-2.5 text-sm font-semibold transition">
            Save Preferences
          </button>
        </div>
      </SettingsSection>

      {/* ── danger zone ───────────────────────────────────── */}
      <div className="dashboard-card border-rose-500/20 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-rose-400" />
          <div>
            <h3 className="font-semibold text-text">Delete Account</h3>
            <p className="mt-1 text-sm text-text-muted">
              Permanently remove your account and all subscription data. This
              action cannot be undone.
            </p>
            <button className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/12 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/20">
              Close Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;
