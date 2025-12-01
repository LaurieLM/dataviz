import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { data } from 'react-router';

export default function Data() {
  const { isPending, error, data } = useQuery({
    queryKey: ['Data'],
    queryFn: async () => {
      const response = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=20');
      return await response.json();
    }
  })

  if (isPending) return <div>Loading...</div>;
  
  if (error) return <div>Error: {error.message}</div>;
console.log(data.results[0].annee_tournage)
    return (
        <div style={{ width: '40%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data= {data.results.map((item: any, index: number) => ({
                    name: item.nom_tournage,
                    number1: item.annee_tournage,
                }))}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="number1" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="number1" stroke="#8884d8" activeDot={{ r: 6 }} />
      </LineChart>
            </ResponsiveContainer>
        </div>
    
    )
}


// export function Graphic() {
//   return (
//     <div style={{ width: '40%', height: '400px' }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           data={data}
//           margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="number1" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="number1" stroke="#8884d8" activeDot={{ r: 6 }} />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );

// }