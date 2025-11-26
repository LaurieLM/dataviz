import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Laurie', number1: 1995, number2: 40 },
  { name: 'Pamela', number1: 1980, number2: 200 },
  { name: 'John', number1: 1920, number2: 150 },
  { name: 'Martin', number1: 1915, number2: 537 },
]

const SimpleLineChart = () => (
  <div style={{ width: '80%', height: '800px' }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="number1" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="number1" stroke="#8884d8" activeDot={{ r: 15 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default SimpleLineChart;
