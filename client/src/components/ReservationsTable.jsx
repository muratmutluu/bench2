import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';
import { format } from 'date-fns';
import axios from 'axios';

const handleDelete = async (id) => {
  try {
    await axios.delete(`/api/admin/delete_reservation/${id}`);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Kullanıcı Adı', width: 150 },
  { field: 'email', headerName: 'Kullanıcı Email', width: 150 },
  { field: 'phone_number', headerName: 'Kullanıcı Telefon No', width: 150 },
  { field: 'field_name', headerName: 'Saha Adı', width: 150 },
  {
    field: 'reservation_date',
    headerName: 'Rezervasyon Tarihi',
    width: 150,
    renderCell: (params) => format(new Date(params.value), 'dd.MM.yyyy'),
  },
  { field: 'reservation_time', headerName: 'Rezervasyon Saati', width: 150 },
  { field: 'field_price', headerName: 'Saha Fiyatı', width: 100 },
  {
    field: 'status',
    headerName: 'Rez. Durumu',
    width: 150,
    renderCell: (params) =>
      params.value === 1 ? (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
          Gerçekleşti
        </span>
      ) : (
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          Gerçekleşmedi
        </span>
      ),
  },
  {
    field: 'actions',
    headerName: 'Kullanıcı Sil',
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <button className="btn-primary !bg-red-500" onClick={() => handleDelete(params.row.id)}>
        Sil
      </button>
    ),
  },
];
const ReservationsTable = () => {
  const { data, loading } = useFetch('/api/admin/all_reservations');
  return (
    <div className="h-[720px] w-full p-3 bg-green-100 rounded-lg">
      {loading ? (
        'Loading...'
      ) : (
        <DataGrid
          className="bg-gray-100"
          rows={data}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            sorting: {
              sortModel: [{ field: 'status', sort: 'asc' }],
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

export default ReservationsTable;
