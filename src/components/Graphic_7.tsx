import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo, useState } from 'react';
import { useQuery } from "@tanstack/react-query";

export default function FilmingByDistrictWithFilter() {
  const [year, setYear] = useState('all');
  
  console.log("Année sélectionnée :", year);

  const { isLoading, error, data } = useQuery({
    queryKey: ["Data", year],
    queryFn: async () => {
      const url = year === 'all' ? `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100` : `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?where=annee_tournage%20%3D%20date'${year}'&limit=100`;

      const response = await fetch(url);


    if (!response.ok) {
      throw new Error("Erreur API : " + response.status);
    }

    const json = await response.json();
      
    return json.results; // tableau d'enregistrements
    },
  });

  const arrayTournageByDistrict = useMemo(() => {
    const districtCount: { [key: string]: number } = {};

    if (!data) return [];

    // console.log("Données reçues dans Graphic_4:", props.data);
    

    console.log("Année sélectionnée :", year);

    // Parcourir tous les éléments
    for (let i = 0; i < data.length; i++) {
      const district = data[i]?.ardt_lieu;
  
      if (district) {
        const districtStr = district.toString();
        
        // Vérifier que ça commence par 75 (Paris)
        if (districtStr.startsWith('75')) {
          // Extraire les 2 derniers chiffres
          const districtShort = districtStr.slice(-2);
          
          // Si l'arrondissement existe on incrémente
          if (districtCount[districtShort]) {
            districtCount[districtShort] += 1;
          } else {
            // Sinon, créer à 1
            districtCount[districtShort] = 1;
          }
        }
      }
    }
  
    // Transformer en tableau pour Recharts
    const chartData = Object.keys(districtCount).map(district => ({
      arrondissement: district,
      tournages: districtCount[district]
    }));

    // Trier les numéro d'arrondissement ordre croissant
    chartData.sort((a, b) => parseInt(a.arrondissement) - parseInt(b.arrondissement));

    // console.log("Données du graphique (district):", chartData);
    return chartData;
  }, [data]);

  // Vérifications après tous les hooks
  if (isLoading) return <div>Chargement...</div>;
  if (error instanceof Error) return <div>Erreur : {error.message}</div>;

  return (
    <div className="w-[50%] h-[400px] pr-[2vw] mb-[14vh]">
      <h2 className="text-center text-[1.5vw] font-semibold mb-[2vh]">Nombre de tournages par arrondissement avec filtre</h2>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="all">Tous les années</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
      </select>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={arrayTournageByDistrict}
          layout="horizontal"
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="arrondissement" />
          <YAxis dataKey="tournages" />
          <Tooltip />
          <Legend />
          <Bar dataKey="tournages" fill="#9cbbfeff" name="Tournages" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}