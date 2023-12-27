import PieChartUser from '../components/PieChartUser';
import ReservationAreaChart from '../components/ReservationAreaChart';
import ReservationChart from '../components/ReservationChart';
import ReservationLineChart from '../components/ReservationLineChart';
import useFetch from '../hooks/useFetch';
import { FaCheck, FaClipboardList, FaClock, FaUserShield, FaUsers } from 'react-icons/fa';
import { TbSoccerField } from 'react-icons/tb';
const Dashboard = () => {
  const { data, loading } = useFetch('api/admin/dashboard');

  return loading ? (
    'Yükleniyor...'
  ) : (
    <div className="wrapper flex flex-col gap-4 overflow-hidden">
      <h1 className="flex items-start leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-green-600 to-green-300 bg-clip-text text-transparent">
        Dashboard
      </h1>

      <section className="p-4 bg-green-200 rounded-lg shadow-md flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 xl:grid-cols-4 2xl:gap-7.5">
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Toplam Rezervasyon Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <FaClipboardList />
              {data.total_reservations}
            </span>
          </div>
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Toplam Kullanıcı Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <FaUsers />
              {data.total_users}
            </span>
          </div>
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Toplam Saha Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <TbSoccerField className="rotate-90" />
              {data.total_fields}
            </span>
          </div>
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Toplam Yönetici Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <FaUserShield />
              {data.total_admins}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Gerçekleşen Rezervasyon Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <FaCheck />
              {data.completed_reservations}
            </span>
          </div>
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Gerçekleşmeyen Rezervasyon Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <FaClock />
              {data.pending_reservations}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-10">
          <div className="rounded-md border bg-gray-100 p-3 shadow-md flex flex-col justify-center items-center col-span-2 gap-2">
            <h2 className="text-2xl">Aylara Göre Rezervasyon Sayısı</h2>
            <ReservationChart data={data.reservations_by_months} loading={loading} />
          </div>

          <div className="rounded-md border bg-gray-100 p-3 shadow-md flex flex-col justify-center items-center gap-2">
            <h2 className="text-2xl">Aylara Göre Kullanıcı Sayısı</h2>
            <PieChartUser data={data.users_by_months} loading={loading} />
          </div>
        </div>

        <div className="rounded-md border bg-gray-100 p-3 shadow-md flex flex-col justify-center items-center col-span-2 gap-2">
          <h2 className="text-2xl">Günlere Göre Rezervasyon Sayısı</h2>
          <ReservationAreaChart data={data.reservations_by_days} loading={loading} />
        </div>
        <div className="rounded-md border bg-gray-100 p-3 shadow-md flex flex-col justify-center items-center col-span-2 gap-2">
          <h2 className="text-2xl">Sahalara ve Aylara Göre Rezervasyon Sayısı</h2>
          <ReservationLineChart data={data.reservations_by_months_and_fields} loading={loading} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
