import { IoSparklesOutline } from 'react-icons/io5';
import hero from '../assets/images/hero.jpg';
import Calendar from '../components/Calendar';

const Home = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById('reservationSection');

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-dotted-pattern bg-contain py-4">
      <section className="wrapper grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col mt-20 gap-10">
          <h1 className="text-5xl font-extrabold text-gray-700 dark:text-white">
            Online Halısaha Kiralama
          </h1>
          <p className="text-2xl font-light text-gray-600 dark:text-gray-100">
            → Benchcafe&apos;de halısaha kiralamak artık çok kolay. <br /> Hemen kayıt ol ve
            istediğin tarihteki rezevasyonunu oluştur.
          </p>
          <div className="flex justify-start">
            <button onClick={handleScroll} className="btn-primary gap-2">
              Rezervasyon Oluştur
              <IoSparklesOutline />
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl h-[90%]">
          <img
            src={hero}
            alt="hero_image"
            className="w-full object-cover object-center transition duration-200 hover:scale-105 rounded-xl"
          />
        </div>
      </section>

      <section className="wrapper mt-12" id="reservationSection">
        <Calendar />
      </section>
    </main>
  );
};

export default Home;
