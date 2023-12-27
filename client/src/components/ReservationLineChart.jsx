import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ReservationLineChart = ({ data, loading }) => {
  if (loading) return 'Yükleniyor...';
  if (!data) return 'Veri yok';
  return (
    <ResponsiveContainer width="100%" height={400} className="text-sm">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ay_yil" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="rez_sayisi_saha_1" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="rez_sayisi_saha_2" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReservationLineChart;
