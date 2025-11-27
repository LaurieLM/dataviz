import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

//  Composant graphique : nombre de tournages par année
import TournagesByYearChart from "../components/TournagesByYearChart";

import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// ------------------------------------------------------------
// Fonction qui récupère les données depuis l’API OpenData Paris
// ------------------------------------------------------------

export default function Graphics() {
  const { isPending, error, data } = useQuery({
    queryKey: ["tournages"],
    queryFn: async () => {
      const response = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=200"
      );

      if (!response.ok) {
        throw new Error("Erreur API : " + response.status);
      }

      const json = await response.json();
      return json.results; // tableau d’enregistrements
    },
  });

  if (isPending) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    <div className="flex flex-col justify-between w-screen h-screen">
      <Header />

      {/* Affichage du graphique */}
      <TournagesByYearChart data={data} />

      <Footer />

      {/* Outil React Query */}
      <ReactQueryDevtools />
    </div>
  );
}
