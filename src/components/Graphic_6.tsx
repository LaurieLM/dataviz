

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Typage des données API
type TournageRecord = {
  fields?: {
    annee_tournage?: number;
    nom_realisateur?: string;
  };
  [key: string]: any;
};

export default function Graphic_6(props: { data: TournageRecord[] }) {
  // 🎯 Filtre par année (ex : 2024)
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  // 📌 Extraction des années disponibles dans les données
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    props.data.forEach(item => {
      const year = item?.annee_tournage;
      if (year) years.add(year);
    });
    return Array.from(years).sort();
  }, [props.data]);

  // 📊 Préparation des données filtrées pour le graphique
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};

    props.data.forEach(item => {
      const year = item?.annee_tournage;
      const director = item?.nom_realisateur;
      

      if (!year || Number(year) !== selectedYear) return;
      if (!director) return;

      counts[director] = (counts[director] || 0) + 1;
    });

    

    // Conversion pour Recharts + tri DESC
    return Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);

  }, [props.data, selectedYear]);
  

  return (
    <div style={{ width: "100%", height: 450 }}>

      {/* 🔽 Selecteur d'année */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          style={{
            padding: "5px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {availableYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* 📊 Graphique */}
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8f8ee7" /> {/* Couleur violette */}
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
