import {
  BellIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
  ReceiptPercentIcon,
  Cog6ToothIcon,
  TvIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { Outlet } from "react-router-dom";
import SidebarItem from "./components/SidebarItem";

const navItems = [
  { label: "Overview", to: "/", icon: Squares2X2Icon, end: true },
  { label: "Subscriptions", to: "/subscriptions", icon: TvIcon },
  {
    label: "Billing History",
    to: "/billing-history",
    icon: ReceiptPercentIcon,
  },
  { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
];

function DashboardLayout() {
  return (
    <div className="min-h-screen scrollbar-hidden bg-background text-text">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-white/8 lg:bg-sidebar/95 lg:backdrop-blur-sm">
        <div className="border-b border-white/8 px-6 py-8">
          <p className="font-display text-3xl tracking-tight text-primary-soft">
            SubStream
          </p>
          <p className="mt-1 text-sm text-text-muted">Premium Plan</p>
        </div>
        <nav className="flex-1 space-y-2 px-4 py-6">
          {navItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </nav>
        <div className="mx-4 mb-6 rounded-xl border border-white/10 bg-elevated px-4 py-3">
          <p className="text-sm font-semibold text-text">Alex Rivera</p>
          <p className="text-xs text-text-muted">alex@substream.io</p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-white/8 bg-background/90 backdrop-blur-md">
          <div className="flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
              <input
                className="input-cinema w-full"
                placeholder="Search services..."
              />
            </div>
            <div className="ml-4 flex items-center gap-3 text-text-muted">
              <button className="icon-button" aria-label="Notifications">
                <BellIcon className="h-5 w-5" />
              </button>
              <button className="icon-button" aria-label="Help">
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </button>
              <button className="icon-button" aria-label="Profile">
                <UserIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="h-[calc(100vh-4.5rem)] overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
