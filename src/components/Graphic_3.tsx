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

    // Trier les numéro d'arrondissement ordre croissant
    // chartData.sort((a, b) => parseInt(a.arrondissement) - parseInt(b.arrondissement));

    console.log("Données du graphique (type x annee):", chartData);
    return chartData;
  }, [props.data]);

  return (
    <div className="w-[50%] h-[400px] pr-[2vw] mb-[14vh]">
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
                  <Area type="monotone" dataKey="Long métrage" stackId="1" stroke="#8884d8" />
                  <Area type="monotone" dataKey="Téléfilm" stackId="1" stroke="#0b075bff"  />
                  <Area type="monotone" dataKey="Série TV" stackId="1" stroke="#c20d10ff"  />
                  <Area type="monotone" dataKey="Série Web" stackId="1" stroke="#0dc20dff" />
                  <Area type="monotone" dataKey="Autres" stackId="1" stroke="#dfee0eff"  />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}