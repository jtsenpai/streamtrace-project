import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function DeleteAccount({ onClose }) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
        <ExclamationTriangleIcon className="h-7 w-7" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-text">
          Delete your account?
        </h4>
        <p className="mt-2 text-sm text-text-muted">
          This will permanently delete your profile, subscriptions, and billing
          history. This action is irreversible.
        </p>
      </div>
      <div className="space-y-3">
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 shadow-lg shadow-rose-500/25"
        >
          Yes, delete my account
        </button>
        <button
          onClick={onClose}
          className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm font-semibold text-text transition hover:bg-white/8"
        >
          I'll keep my account
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
