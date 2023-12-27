// import { BarChart } from '@mui/x-charts/BarChart';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ReservationChart = ({ data, loading }) => {
  if (loading) return 'Yükleniyor...';
  if (!data) return 'Veri yok';

  return (
    <ResponsiveContainer width="100%" height={400} className="text-sm">
      <BarChart
        width="100%"
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 40,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ay_yil" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="rez_sayisi"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReservationChart;
