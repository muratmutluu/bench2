import { GiSoccerBall } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.get('/api/auth/logout');
      console.log(res.data.message);
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    } catch (error) {
      return error.response.data.message;
    }
  };

  return (
    <header className="w-full border-b dark:border-gray-600">
      <div className="wrapper flex max-md:flex-wrap max-md:gap-3 items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-green-600 bg-gray-50 p-1.5 rounded-md">
          <GiSoccerBall size={32} />
          <span className="text-4xl font-extrabold">Bench Cafe</span>
          {user && user.isAdmin === 1 && (
            <span className="text-2xl ml-2 p-1 text-red-500  border-2 border-red-500 rounded-xl font-bold">
              Admin
            </span>
          )}
        </Link>

        <div className="flex items-center gap-3">
          <DarkModeSwitcher />
          {user ? (
            <>
              {user.isAdmin ? (
                <>
                  <Link to="/dashboard" className="btn-primary">
                    Dashboard
                  </Link>
                  <Link to="/all_reservations" className="btn-primary">
                    Tüm Rezervasyonlar
                  </Link>
                  <Link to="/all_users" className="btn-primary">
                    Tüm Kullanıcılar
                  </Link>
                </>
              ) : (
                <Link to="/reservation_list" className="btn-primary">
                  Rezervasyonlarım
                </Link>
              )}

              <span className="text-xl flex items-center gap-1 cursor-pointer text-gray-800 dark:text-gray-50 border-r-2 border-gray-300 pr-3">
                <FaUser />
                {user.username}
              </span>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={handleLogout}>
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="btn-outline">
                Kayıt Ol !
              </Link>
              <Link to="/login" className="btn-primary">
                Giriş Yap
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
