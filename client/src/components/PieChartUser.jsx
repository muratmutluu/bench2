import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const PieChartUser = ({ data, loading }) => {
  if (loading) return 'Yükleniyor...';
  if (!data) return 'Veri yok';
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#e15050', '#8884d8', '#3131ad'];
  return (
    <ResponsiveContainer width="100%" height={400} className="text-sm">
      <PieChart width="100%" height={400}>
      <Tooltip />
        <Pie
          data={data}
          dataKey="user_sayisi"
          nameKey="ay_yil"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((item, index) => (
            <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
          ))}
        
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartUser;
