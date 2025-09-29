import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import ClientListPage from "./pages/Clients/ClientListPage.jsx";
import ClientMainPage from "./pages/Clients/ClientMainPage.jsx";
import PoliciesPage from "./pages/Policies/PoliciesPage.jsx";
import ProposalsPage from "./pages/Proposals/ProposalsPage.jsx";
import ReportsPage from "./pages/Reports/ReportsPage.jsx";
import SettingsPage from "./pages/Settings/SettingsPage.jsx";
import ClientDetails from "./pages/Clients/ClientOutlet/ClientDetails.jsx";
import ClientChat from "./pages/Clients/ClientOutlet/ClientChat.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "clients",
        element: <ClientListPage />,
      },
      {
        path: "clients/:clientId",
        element: <ClientMainPage />,
        children: [
          {
            index: true,
            element: <Navigate to="details" replace />,
          },
          {
            path: "details",
            element: <ClientDetails />,
          },
          {
            path: "chat",
            element: <ClientChat />,
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
