import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/api/auth/login', inputs);
      const data = res.data;
      console.log(data.data);

      if (data.success === false) {
        dispatch({ type: 'LOGIN_FAILURE', payload: data.response.data.message });
        return;
      }
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.data });
      navigate('/');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
    }
  };

  return (
    <section className="wrapper">
      <div className="mx-auto w-full max-w-md flex flex-col">
        <h2 className="text-3xl text-center font-bold text-gray-900 dark:text-gray-50">Hesabınıza giriş yapın</h2>
        <p className="mt-2 text-center text-md text-gray-600 dark:text-gray-200">
          Hesabınız yoksa{' '}
          <Link className="text-blue-600 font-medium underline hover:no-underline" to="/register">
            kayıt olun
          </Link>
          .
        </p>
        <div className="bg-white shadow rounded-lg mt-8">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                required
                name="email"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Parola"
                className="border p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                required
                name="password"
                onChange={handleChange}
              />
              <button
                className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
                disabled={loading}
              >
                {loading ? 'Yükleniyor...' : 'Giriş Yap'}
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-5 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
