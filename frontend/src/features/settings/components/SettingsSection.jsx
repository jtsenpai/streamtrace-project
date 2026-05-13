function SettingsSection({ icon: Icon, title, action, children }) {
  return (
    <div className="dashboard-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <Icon className="h-8 w-8 text-primary" />
          <h2 className="text-lg font-display text-text">{title}</h2>
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default SettingsSection;
