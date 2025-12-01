import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

export default function Graphic1(props: { data: any }) {
  
  const arrayTournageByYear = useMemo(() => {
    const yearCount: { [key: string]: number } = {};
    
    // Parcourir tous les éléments
    for (let i = 0; i < props.data.length; i++) { 
      const year = props.data[i]?.annee_tournage;
      
      if (year) {
        // Si l'année existe déjà, incrémenter
        if (yearCount[year]) {
          yearCount[year] += 1;
        } else {
          // Sinon, initialiser à 1
          yearCount[year] = 1;
        }
      }
    }
    
    // Transformer l'objet en tableau pour Recharts
    const chartData = Object.keys(yearCount).map(year => ({
      year: parseInt(year),
      count: yearCount[year]
    }));
    
    // Trier par année
    return chartData.sort((a, b) => a.year - b.year);
  }, [props.data]);
  
  // console.log("Données du graphique:", arrayTournageByYear);
  
  return (
    <div className="w-[50%] h-[400px] pl-[2vw] mb-[14vh]">
      <h2 className="text-center text-[1.5vw] font-semibold mb-[2vh]">Nombre de tournages par année</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={arrayTournageByYear}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 6 }} name="Nombre de tournages" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
