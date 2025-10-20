import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  createHashRouter, // ✅ use this instead
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import ClientListPage from "./pages/Clients/ClientListPage.jsx";
import ClientMainPage from "./pages/Clients/ClientMainPage.jsx";
import ProposalsPage from "./pages/Proposals/ProposalsPage.jsx";
import AnnouncementPage from "./pages/Announcement/AnnouncementPage.jsx";
import SettingsPage from "./pages/Settings/SettingsPage.jsx";
import ClientDetails from "./pages/Clients/ClientOutlet/ClientDetails.jsx";
import ClientChat from "./pages/Clients/ClientOutlet/ClientChat.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "clients", element: <ClientListPage /> },
      {
        path: "clients/:clientId",
        element: <ClientMainPage />,
        children: [
          { index: true, element: <Navigate to="details" replace /> },
          { path: "details", element: <ClientDetails /> },
          { path: "chat", element: <ClientChat /> },
        ],
      },
      { path: "proposals", element: <ProposalsPage /> },
      { path: "announcement", element: <AnnouncementPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "*",
    element: (
      <div>
        <h1>nothing here</h1>
        <Link to={"/"}>go here</Link>
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>  
  </StrictMode>,
);
