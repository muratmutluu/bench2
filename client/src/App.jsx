import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReservationList from './pages/ReservationList';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user?.isAdmin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/reservation_list', element: <ReservationList /> },
        { path: '/dashboard', element: <ProtectedRoute>Dashboard</ProtectedRoute> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
