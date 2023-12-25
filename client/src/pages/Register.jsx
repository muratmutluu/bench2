import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [inputs, setInputs] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post('/api/auth/register', inputs);
      const data = res.data;
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  //   console.log(inputs);

  return (
    <section className="wrapper">
      <div className="mx-auto w-full max-w-md flex flex-col">
        <h2 className="text-3xl text-center font-bold text-gray-900 dark:text-gray-50">Ücretsiz Kayıt Olun</h2>
        <p className="mt-2 text-center text-md text-gray-600 dark:text-gray-200">
          Hesabınız varsa{' '}
          <Link className="text-blue-600 font-medium underline hover:no-underline" to="/login">
            giriş yapın
          </Link>
          .
        </p>
        <div className="bg-white shadow rounded-lg mt-8">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Kullanıcı Adı"
                className="border p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                required
                name="username"
                onChange={handleChange}
              />
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
              <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
                {loading ? 'Yükleniyor...' : 'Kayıt Ol'}
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-5 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
