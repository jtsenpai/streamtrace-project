import ActionButton from "./ActionButton";

const AddSubscriptionForm = ({ onSubmit }) => {
  return (
    <form className="space-y-4" onSubmit={(e) => {
      e.preventDefault();
      if (onSubmit) onSubmit();
    }}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-muted">Subscription Name</label>
        <input type="text" className="input-cinema" placeholder="Netflix, Spotify, etc." />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-muted">Price</label>
          <input type="text" className="input-cinema" placeholder="$9.99" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-muted">Billing Cycle</label>
          <select className="input-cinema bg-surface">
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      <div className="pt-4">
        <ActionButton variant="primary" className="w-full">
          Create Subscription
        </ActionButton>
      </div>
    </form>
  );
};

export default AddSubscriptionForm;
