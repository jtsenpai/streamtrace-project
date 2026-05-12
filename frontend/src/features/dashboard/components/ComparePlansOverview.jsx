import { Sparkles } from "lucide-react";

const ComparePlansOverview = () => {
  return (
    <div className="space-y-4 text-center py-6">
      <Sparkles className="mx-auto text-primary" size={48} />
      <div className="space-y-2">
        <h4 className="text-xl font-semibold text-text">Intelligent Insights</h4>
        <p className="text-text-muted">
          Analyze your spending and find better alternatives for your subscriptions.
        </p>
      </div>
      <div className="mt-4 rounded-xl border border-white/5 bg-white/2 p-4">
        <p className="text-sm italic text-primary-soft">Feature coming soon...</p>
      </div>
    </div>
  );
};

export default ComparePlansOverview;
