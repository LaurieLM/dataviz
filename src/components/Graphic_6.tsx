import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type ApiRecord = {
    "annee_tournage": string,
    "value": number
};

export default function Graphic_6() {
  const [selectedYear, setSelectedYear] = useState("All");

  const { isLoading, error, data } = useQuery({
    queryKey: ["TopRealisateursByYear", selectedYear],
    queryFn: async () => {
      const url = new URL(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records"
      );

      url.searchParams.set("select", "nom_realisateur, count(*) as total");
      url.searchParams.set("group_by", "nom_realisateur");
      url.searchParams.set("order_by", "total DESC");
      url.searchParams.append("where", "nom_realisateur is not null");
      url.searchParams.set("limit", "10");

      if (selectedYear !== "All") {
        url.searchParams.append(
          "where",
          `annee_tournage=date'${selectedYear}'`
        );
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Erreur API : " + response.status);
      }

      const json = await response.json();
      return json.results;
    },
  });

  const { data: allYears } = useQuery({
    queryKey: ["AllYeears"],
    queryFn: async () => {
      const url = new URL(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records"
      );

      url.searchParams.set("select", "year(annee_tournage) as value");
      url.searchParams.set("group_by", "annee_tournage");

      const response = await fetch(url.toString());
      console.log(response);

      if (!response.ok) {
        throw new Error("Erreur API : " + response.status);
      }

      const json = await response.json();
      return json.results;
    },
  });


  return (
    <div className="w-[50%] lg:w-[40%] min-h-[350px] mt-10">
      {/* Titre */}
      <h2 className="text-center text-[1.3vw] font-semibold mb-4">
        Top réalisateurs pour l'année sélectionnée
      </h2>

      {/* Sélecteur de l'année */}
      <div className="flex justify-center mb-4">
        <select
          className="border px-2 py-1 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All">All</option>
          {allYears?.map((year: ApiRecord) => (
            <option key={year.value} value={year.value}>
              {year.value}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage du graphique */}
      <>
        {/* Graphique */}
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="nom_realisateur"
                tick={{ fontSize: 10 }}
                angle={-20}
                interval={0}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#b18cfe" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>
      {/* )} */}
    </div>  
  );
}
// ---------------------------------------------------*/}
