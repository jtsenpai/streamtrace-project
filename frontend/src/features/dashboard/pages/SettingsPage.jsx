import { useState } from "react";

import {
  ExclamationTriangleIcon,
  CreditCardIcon,
  PencilIcon,
  PlusIcon,
  BellIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import Modal from "../../../components/Modal";
import Toggle from "../../../components/Toggle";
import SettingsSection from "../../settings/components/SettingsSection";
import {
  notificationPreferences as defaultPrefs,
  paymentMethods,
  userProfile,
} from "../data/mockSettingsData";
import AddPaymentForm from "../../settings/components/AddPaymentForm";
import DeletePayment from "../../settings/components/DeletePayment";
import DeleteAccount from "../../settings/components/DeleteAccount";

/* ── page ─────────────────────────────────────────────────── */

function SettingsPage() {
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [activeModal, setActiveModal] = useState(null); // 'addPayment', 'deletePayment', 'deleteAccount'
  const [selectedPayment, setSelectedPayment] = useState(null);

  const closeModal = () => setActiveModal(null);

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
      <SettingsSection icon={UserIcon} title="Profile Settings">
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
              <PencilIcon className="h-4 w-4" />
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
        icon={CreditCardIcon}
        title="Payment Methods"
        action={
          <button
            onClick={() => setActiveModal("addPayment")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-soft transition hover:text-primary"
          >
            <PlusIcon className="h-4 w-4" />
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
                  <CreditCardIcon className="h-4 w-4" />
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
                  onClick={() => {
                    setSelectedPayment(pm);
                    setActiveModal("deletePayment");
                  }}
                  className="icon-button text-text-muted hover:text-rose-400"
                  aria-label={`Remove ${pm.type} ending in ${pm.lastFour}`}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* ── notification preferences ──────────────────────── */}
      <SettingsSection icon={BellIcon} title="Notification Preferences">
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
      <div className="dashboard-card-danger p-6">
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="h-8 w-8 mt-0.5 shrink-0 text-red-400" />
          <div className="flex flex-row items-start justify-between w-full">
            <div className="max-w-sm">
              <h3 className="font-semibold text-text">Delete Account</h3>
              <p className="mt-1 text-sm text-text-muted">
                Permanently remove your account and all subscription data. This
                action cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setActiveModal("deleteAccount")}
              className="mt-4 rounded-lg border border-red-900/50 bg-red-900/25 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-900/35"
            >
              Close Account
            </button>
          </div>
        </div>
      </div>
      {/* Modals */}
      <Modal
        isOpen={!!activeModal}
        onClose={closeModal}
        title={
          activeModal === "addPayment"
            ? "Add Payment Method"
            : activeModal === "deletePayment"
              ? "Remove Payment Method"
              : "Delete Account"
        }
      >
        {activeModal === "addPayment" && (
          <AddPaymentForm onClose={closeModal} onSubmit={closeModal} />
        )}

        {activeModal === "deletePayment" && (
          <DeletePayment
            selectedPayment={selectedPayment}
            onClose={closeModal}
          />
        )}

        {activeModal === "deleteAccount" && (
          <DeleteAccount onClose={closeModal} />
        )}
      </Modal>
    </section>
  );
}

export default SettingsPage;
