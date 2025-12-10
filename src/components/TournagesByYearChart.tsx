// -------------------------------------------------------------
// TournagesByYearChart
// Ce composant affiche un graphique en barres représentant
// le nombre de tournages par année à partir des données
// fournies par l’API Open Data Paris.
// -------------------------------------------------------------

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

//  Typage des données retournées par l’API
interface FilmRecord {
  fields: {
    annee_tournage?: string;
  };
  [key: string]: unknown; // champs supplémentaires ignorés
}

interface Props {
  data: FilmRecord[];
}

export default function TournagesByYearChart({ data }: Props) {
  // -------------------------------------------------------------
  // 1) Comptage du nombre di tornaggi per anno
  // -------------------------------------------------------------
  const counts: Record<string, number> = {};
  
  data.forEach(item => {
  //  On récupère l'année de tournage dans les champs de l’enregistrement
  const year = item.fields?.annee_tournage;

  //  Si l’année n’existe pas (champ manquant), on ignore cet enregistrement
  if (!year) return;

  //  On incrémente le compteur pour cette année
  // (si counts[year] n’existe pas encore, on le met à 0)
  counts[year] = (counts[year] || 0) + 1;
});


  // -------------------------------------------------------------
  // 2) Transformation en tableau pour Recharts
  // -------------------------------------------------------------
  const chartData = Object.entries(counts).map(([year, total]) => ({
    year,
    total,
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" fill="#1e40af" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
