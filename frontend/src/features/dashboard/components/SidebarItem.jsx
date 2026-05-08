import { NavLink } from "react-router-dom";

function SidebarItem({ to, icon: Icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition",
          isActive
            ? "border-primary/30 bg-primary/12 text-primary-soft"
            : "border-transparent text-text-muted hover:border-white/10 hover:bg-white/4 hover:text-text",
        ].join(" ")
      }
    >
      <Icon size={17} />
      <span>{label}</span>
    </NavLink>
  );
}

export default SidebarItem;
