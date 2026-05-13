import { CreditCardIcon } from "@heroicons/react/24/outline";
import ActionButton from "../../dashboard/components/ActionButton";

function AddPaymentForm({ onClose, onSubmit }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-muted">
          Cardholder Name
        </label>
        <input type="text" className="input-cinema" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-muted">
          Card Number
        </label>
        <div className="relative">
          <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" />
          <input
            type="text"
            className="input-cinema pl-10"
            placeholder="0000 0000 0000 0000"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-muted">
            Expiry Date
          </label>
          <input type="text" className="input-cinema" placeholder="MM/YY" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-muted">CVV</label>
          <input type="password" className="input-cinema" placeholder="•••" />
        </div>
      </div>
      <div className="pt-4">
        <ActionButton variant="primary" className="w-full" onClick={onClose}>
          Save Payment Method
        </ActionButton>
      </div>
    </form>
  );
}

export default AddPaymentForm;
