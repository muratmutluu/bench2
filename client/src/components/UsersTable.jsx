import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';
import { format } from 'date-fns';
import axios from 'axios';


const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/delete_user/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };



const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Kullanıcı Adı', width: 200 },
  { field: 'email', headerName: 'Kullanıcı Email', width: 200 },
  { field: 'phone_number', headerName: 'Kullanıcı Telefon No', width: 200 },
  {
    field: 'created_time',
    headerName: 'Kayıt Tarihi',
    width: 200,
    renderCell: (params) => format(new Date(params?.value), 'dd.MM.yyyy kk:mm:ss'),
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

const UsersTable = () => {
  const { data, loading } = useFetch('/api/admin/all_users');
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

export default UsersTable;
