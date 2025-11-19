import { useEffect, useState } from "react";
import { listenToUsers } from "../../backend/firebase_firestore";
import DashboardContainer from "./layout/DashboardContainer";
import ChartsGrid from "./layout/ChartsGrid";
import SummaryCard from "./components/SummaryCard";
import RecentMessages from "./components/RecentMessages";

export default function DashboardPage() {
  const [clients, setClients] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToUsers((users) => {
      setClients(users);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!clients.length) return;

    // Count clients per status
    const statusCount = clients.reduce((acc, c) => {
      const s = c.status || "Unknown";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
    setStatusData(
      Object.entries(statusCount).map(([name, value]) => ({ name, value })),
    );

    // Count clients per created date
    const dateCount = clients.reduce((acc, c) => {
      if (!c.createdAt) return acc;
      const createdAt = c.createdAt?.toDate?.() || new Date(c.createdAt);
      const key = createdAt.toISOString().split("T")[0];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    setDateData(
      Object.entries(dateCount).map(([date, count]) => ({ date, count })),
    );

    // Age groups
    const today = new Date();
    const ages = clients
      .map((c) =>
        c.birthdate
          ? today.getFullYear() - new Date(c.birthdate).getFullYear()
          : null,
      )
      .filter(Boolean);

    const ageGroups = { "18-25": 0, "26-35": 0, "36-45": 0, "46+": 0 };
    ages.forEach((a) => {
      if (a <= 25) ageGroups["18-25"]++;
      else if (a <= 35) ageGroups["26-35"]++;
      else if (a <= 45) ageGroups["36-45"]++;
      else ageGroups["46+"]++;
    });
    setAgeData(Object.entries(ageGroups).map(([name, age]) => ({ name, age })));

    // Recent messages
    const allMessages = clients.flatMap((c) =>
      (c.messages || []).map((m) => ({
        ...m,
        client: c.fullname || "Unknown",
      })),
    );
    setRecentMessages(
      allMessages
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        .slice(0, 5),
    );
  }, [clients]);

  const totalClients = clients.length;

  return (
    <DashboardContainer>
      <h1 className="mb-4 text-base font-bold sm:text-base md:text-base">
        Dashboard Analytics
      </h1>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:gap-4">
        <SummaryCard title="Total Clients" value={totalClients} />

        {statusData.map(({ name, value }) => {
          // Map color based on status
          let color = "text-gray-500";
          if (name === "Pending") color = "text-yellow-500";
          else if (name === "Active") color = "text-green-500";
          else if (name === "Inactive") color = "text-red-500";

          return (
            <SummaryCard key={name} title={name} value={value} color={color} />
          );
        })}
      </div>

      <ChartsGrid
        statusData={statusData}
        dateData={dateData}
        ageData={ageData}
      />

      <RecentMessages messages={recentMessages} clients={clients} />
    </DashboardContainer>
  );
}
