import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TournageRecord = {
  type_tournage?: string;
};

export default function Graphic2(props: { data: TournageRecord[] }) {
  const chartData = useMemo(() => {
    const countByType: Record<string, number> = {};

    for (const item of props.data) {
      const type = item?.type_tournage?.trim() || "Inconnu";
      countByType[type] = (countByType[type] || 0) + 1;
    }

    return Object.entries(countByType).map(([type, total]) => ({
      type,
      total,
    }));
  }, [props.data]);

  return (
    <div className="w-[45%] h-[400px]">
      <h2 className="text-center">Répartition par type de tournage</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="type"
            interval={0}
            angle={-20}
            textAnchor="end"
            height={70}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total"
            fill="#82ca9d"
            name="Nombre de tournages"
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
