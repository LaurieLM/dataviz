import { useQuery } from "@tanstack/react-query";

export function Data() {
  const { isPending, error, data } = useQuery({
    queryKey: ['Data'],
    queryFn: async () => {
      const response = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100');
      return await response.json();
    }
  })

  if (isPending) return <div>Loading...</div>;
  
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
          <h1>Données des lieux de tournage à Paris</h1><br />
          <h2>NOM :</h2> 
          <p>{data?.results?.[0]?.nom_tournage || 'Pas de données'}</p><br />
          <h2>REALISATEUR :</h2> 
          <p>{data?.results?.[0]?.nom_realisateur || 'Pas de données'}</p><br />
          <h2>TYPE DE TOURNAGE :</h2> 
          <p>{data?.results?.[0]?.type_tournage || 'Pas de données'}</p><br />
          <h2>ANNEE :</h2> 
          <p>{data?.results?.[0]?.annee_tournage || 'Pas de données'}</p><br />
          <h2>ARRONDISSEMENT :</h2> 
          <p>{data?.results?.[0]?.ardt_lieu || 'Pas de données'}</p><br />
          <h2>COORDONEES GEOGRAPHIQUE :</h2> 
          <p>{data?.results?.[0]?.geo_point_2d ? `Latitude: ${data.results[0].geo_point_2d.lat}, Longitude: ${data.results[0].geo_point_2d.lon}` : 'Pas de données'}</p>
    </div>
  )
}