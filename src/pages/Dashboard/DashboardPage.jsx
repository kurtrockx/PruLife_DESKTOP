import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../backend/firebase_firestore";
import DashboardContainer from "./layout/DashboardContainer";
import ChartsGrid from "./layout/ChartsGrid";
import SummaryCard from "./components/SummaryCard";
import PieChartComponent from "./components/PieChartComponent";
import BarChartComponent from "./components/BarChartComponent";
import RecentMessages from "./components/RecentMessages";

export default function DashboardPage() {
  const [clients, setClients] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  // === FETCH USERS FROM FIRESTORE ===
  useEffect(() => {
    async function loadUsers() {
      const users = await fetchAllUsers();
      if (users && users.length > 0) {
        setClients(users);
      } else {
        console.warn("No clients found in Firestore.");
      }
    }
    loadUsers();
  }, []);

  // === COMPUTE ANALYTICS ===
  useEffect(() => {
    if (clients.length === 0) return;

    // STATUS DATA
    const statusCount = clients.reduce((acc, c) => {
      const s = c.status || "Unknown";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
    setStatusData(
      Object.entries(statusCount).map(([name, value]) => ({ name, value })),
    );

    // DATE DATA
    const dateCount = clients.reduce((acc, c) => {
      if (!c.createdAt) return acc;
      const createdAt = c.createdAt?.toDate?.() || new Date(c.createdAt);
      const dateKey = createdAt.toISOString().split("T")[0];
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});
    setDateData(
      Object.entries(dateCount).map(([date, count]) => ({ date, count })),
    );

    // AGE DATA
    const today = new Date();
    const ages = clients
      .map((c) => {
        if (!c.birthdate) return null;
        const birth = new Date(c.birthdate);
        return today.getFullYear() - birth.getFullYear();
      })
      .filter(Boolean);

    const ageGroups = { "18-25": 0, "26-35": 0, "36-45": 0, "46+": 0 };
    ages.forEach((a) => {
      if (a <= 25) ageGroups["18-25"]++;
      else if (a <= 35) ageGroups["26-35"]++;
      else if (a <= 45) ageGroups["36-45"]++;
      else ageGroups["46+"]++;
    });
    setAgeData(Object.entries(ageGroups).map(([name, age]) => ({ name, age })));

    // RECENT MESSAGES
    const allMessages = clients.flatMap((c) =>
      (c.messages || []).map((m) => ({
        ...m,
        client: c.fullname || "Unknown",
      })),
    );
    const sorted = allMessages
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      .slice(0, 5);
    setRecentMessages(sorted);
  }, [clients]);

  // SUMMARY
  const totalClients = clients.length;
  const pendingClients = clients.filter((c) => c.status === "pending").length;
  const activeClients = clients.filter((c) => c.status === "active").length;

  return (
    <DashboardContainer>
      <h1 className="text-2xl font-bold">Dashboard Analytics</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:gap-4">
        <SummaryCard title="Total Clients" value={totalClients} />
        <SummaryCard
          title="Pending"
          value={pendingClients}
          color="text-yellow-500"
        />
        <SummaryCard
          title="Active"
          value={activeClients}
          color="text-green-500"
        />
      </div>

      {/* CHARTS GRID */}
      <ChartsGrid
        statusData={statusData}
        dateData={dateData}
        ageData={ageData}
      />

      {/* RECENT MESSAGES */}
      <RecentMessages messages={recentMessages} />
    </DashboardContainer>
  );
}
