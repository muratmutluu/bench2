import ReservationsTable from '../components/ReservationsTable';

const ReservationsList = () => {
  return (
    <div className="wrapper flex flex-col gap-4 overflow-hidden">
      <h1 className="flex items-start leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-green-600 to-green-300 bg-clip-text text-transparent">
        Tüm Rezervasyonlar
      </h1>

      <ReservationsTable />
    </div>
  );
};

export default ReservationsList;
