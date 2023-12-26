import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';
import { format } from 'date-fns';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Kullanıcı Adı', width: 150},
  { field: 'field_name', headerName: 'Saha Adı', width: 150 },
  {
    field: 'reservation_date',
    headerName: 'Rezervasyon Tarihi',
    width: 150,
    renderCell: (params) => format(new Date(params.value), 'dd.MM.yyyy')
  },
  { field: 'reservation_time', headerName: 'Rezervasyon Saati', width: 150 },
  { field: 'field_price', headerName: 'Saha Fiyatı', width: 150 },
];

const ReservationTable = () => {
  const { data, loading } = useFetch('/api/reservations/list');
  return (
    <div className="h-[600px] w-full p-3 bg-green-100 rounded-lg">
      {loading ? (
        'Loading...'
      ) : (
        <DataGrid
        className='bg-gray-100'
          rows={data}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      )}
    </div>
  );
};

export default ReservationTable;
