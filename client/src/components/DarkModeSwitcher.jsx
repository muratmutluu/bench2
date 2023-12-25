import useDarkMode from '../hooks/useDarkMode';
import { FiMoon, FiSun } from "react-icons/fi";
const DarkModeSwitcher = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <label
      htmlFor="AcceptConditions"
      className="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
    >
      <input
        type="checkbox"
        id="AcceptConditions"
        className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />

      <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600">
      <FiSun className='h-4 w-4' data-unchecked-icon/>

      <FiMoon className='hidden h-4 w-4' data-checked-icon/>
      </span>

      <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
    </label>
  );
};

export default DarkModeSwitcher;
