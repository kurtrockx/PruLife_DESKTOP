import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import ClientsPage from "./pages/Clients/ClientsPage.jsx";
import PoliciesPage from "./pages/Policies/PoliciesPage.jsx";
import ProposalsPage from "./pages/Proposals/ProposalsPage.jsx";
import ReportsPage from "./pages/Reports/ReportsPage.jsx";
import SettingsPage from "./pages/Settings/SettingsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "clients",
        element: <ClientsPage />,
        children: [
          {
            path: ":clientId",
            element: <h1>Individual client page</h1>,
          },
        ],
      },
      {
        path: "policies",
        element: <PoliciesPage />,
      },
      {
        path: "proposals",
        element: <ProposalsPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
