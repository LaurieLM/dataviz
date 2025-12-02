import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

export default function TypeByYear(props: { data: any }) { 
  const arrayTypeByYear = useMemo(() => {
    const yearType: { [year: string]: { [type: string]: number} } = {};

      console.log("Données reçues dans Graphic_3:", props.data);
      
    //Récupérer les types par année
    // Parcourir tous les éléments
    for (let i = 0; i < props.data.length; i++) {
      const year = props.data[i]?.annee_tournage;
  
        if (year) {
        const yearStr = year.toString();
        
        const type = props.data[i]?.type_tournage;

            if (type) {
                const typeStr = type.toString();
                //Vérifier que l'année existe
                if (yearType[yearStr]) {
                    yearType[yearStr][typeStr];
                } else {
                // Sinon, créer l'objet pour l'année
                    yearType[yearStr] = {
                    "Long métrage": 0,
                    "Téléfilm": 0,
                    "Série TV": 0,
                    "Série Web": 0,
                    "Autres": 0
                    };
                }
                // Incrémenter le type pour l'année
                yearType[yearStr][typeStr] += 1;
            }      
        }
    }
  
    // Transformer en tableau pour Recharts
    const chartData = Object.keys(yearType).map(year => ({
      year: year,
      ...yearType[year]  // ← Le "..." étale toutes les keys dans un seul objet
    }));

    console.log("Données du graphique (type x annee):", chartData);
    return chartData;
  }, [props.data]);

  return (
    <div className="w-[50%] h-[400px] mb-[14vh]">
      <h2 className="text-center text-[1.5vw] font-semibold mb-[2vh]">Types x Année</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={arrayTypeByYear}

          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
                  <Area type="linear" dataKey="Long métrage" stackId="1" stroke="#077e25ff" strokeWidth={2} />
                  <Area type="linear" dataKey="Téléfilm" stackId="2" stroke="#1bc6ddff" strokeWidth={2}  />
                  <Area type="linear" dataKey="Série TV" stackId="3" stroke="#d774caff" strokeWidth={2}  />
                  <Area type="linear" dataKey="Série Web" stackId="4" stroke="#7f5fd6ff" strokeWidth={2} />
                  <Area type="linear" dataKey="Autres" stackId="5" stroke="#ed5459ff" strokeWidth={2}  />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}