import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

export default function TopDirector(props: { data: any }) { 
  const arrayTopDirector = useMemo(() => {
    const directorCount: { [key: string]: number } = {};

    console.log("Données reçues dans Graphic_4:", props.data);

    // Parcourir tous les éléments
    for (let i = 0; i < props.data.length; i++) {
      const director = props.data[i]?.nom_realisateur;
  
      if (director) {
        // Si le réalisateur existe on incrémente
        if (directorCount[director]) {
          directorCount[director] += 1;
        } else {
          // Sinon, créer à 1
          directorCount[director] = 1;
        }
      }
    }
  
    // Transformer en tableau pour Recharts
    const chartData = Object.keys(directorCount).map(director => ({
      director: director,
      tournages: directorCount[director]
    }));

    // Trier par nombre de tournages (du plus grand au plus petit)
    chartData.sort((a, b) => b.tournages - a.tournages);

    // Garder seulement le top 10
    const top10 = chartData.slice(0, 10);

    console.log("Données du graphique (réalisateurs):", top10);
    return top10;
  }, [props.data]);

  return (
    <div className="w-[55%] h-[400px]">
      <h2 className="text-center">Top réalisateurs</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={arrayTopDirector}
          layout="horizontal"
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="director" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tournages" fill="#8884d8" name="Réalisateurs" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}