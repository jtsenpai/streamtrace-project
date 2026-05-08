import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import BillingHistoryPage from "./features/dashboard/pages/BillingHistoryPage";
import DashboardOverview from "./features/dashboard/pages/DashboardOverview";
import SettingsPage from "./features/dashboard/pages/SettingsPage";
import SubscriptionsPage from "./features/dashboard/pages/SubscriptionsPage";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="billing-history" element={<BillingHistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
