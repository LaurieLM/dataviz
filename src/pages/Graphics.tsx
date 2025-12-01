
import Data from "../components/Graphic_1";

import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// ------------------------------------------------------------
// Fonction qui récupère les données depuis l’API OpenData Paris
// ------------------------------------------------------------

export default function Graphics() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["tournages"],
    queryFn: async () => {
      const response = await fetch(
  "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100"
);


      if (!response.ok) {
        throw new Error("Erreur API : " + response.status);
      }

      const json = await response.json();
      return json.results; // tableau d’enregistrements
    },
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error instanceof Error) return <div>Erreur : {error.message}</div>;
  if (!data) return <div>Aucune donnée</div>;

  return (
      <div className='flex flex-col justify-between w-[100vw] h-[100vh]'>
      <Data />

      </div>
  )
}
