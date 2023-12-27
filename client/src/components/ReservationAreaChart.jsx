import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ReservationAreaChart = ({ data, loading }) => {
  if (loading) return 'Yükleniyor...';
  if (!data) return 'Veri yok';
  return (
    <ResponsiveContainer width="100%" height={400} className="text-sm">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gun" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="rez_sayisi" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ReservationAreaChart;
