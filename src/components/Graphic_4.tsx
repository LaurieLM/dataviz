import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

export default function FilmingByDistrict(props: { data: any }) { 
  const arrayTournageByDistrict = useMemo(() => {
    const districtCount: { [key: string]: number } = {};

    // console.log("Données reçues dans Graphic_4:", props.data);

    // Parcourir tous les éléments
    for (let i = 0; i < props.data.length; i++) {
      const district = props.data[i]?.ardt_lieu;
  
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
  }, [props.data]);

  return (
    <div className="w-[50%] h-[400px] pr-[2vw] mb-[14vh]">
      <h2 className="text-center text-[1.5vw] font-semibold mb-[2vh]">Nombre de tournages par arrondissement</h2>
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
