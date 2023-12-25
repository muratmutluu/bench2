import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
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
        { path: '/register', element: <Register/>}
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
