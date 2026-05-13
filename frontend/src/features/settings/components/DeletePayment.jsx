import { TrashIcon } from "@heroicons/react/24/outline";

function DeletePayment({ onClose, selectedPayment }) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
        <TrashIcon className="h-7 w-7" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-text">
          Remove payment method?
        </h4>
        <p className="mt-2 text-sm text-text-muted">
          Are you sure you want to remove the {selectedPayment?.type} ending in{" "}
          {selectedPayment?.lastFour}?
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onClose}
          className="rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm font-semibold text-text transition hover:bg-white/8"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default DeletePayment;
