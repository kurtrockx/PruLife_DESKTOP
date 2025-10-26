import ChartCard from "../components/ChartCard";
import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";

export default function ChartsGrid({ statusData, dateData, ageData }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
      <ChartCard title="Clients by Status" compact>
        <PieChartComponent data={statusData} />
      </ChartCard>

      <ChartCard title="New Clients per Day" compact>
        <BarChartComponent
          data={dateData}
          dataKey="count"
          xKey="date"
          color="#8884d8"
        />
      </ChartCard>

      <ChartCard title="Client Age Distribution" compact fullWidth>
        <BarChartComponent
          data={ageData}
          dataKey="age"
          xKey="name"
          color="#00C49F"
        />
      </ChartCard>
    </div>
  );
}

