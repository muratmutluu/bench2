import { useState } from 'react';
import {
  addWeeks,
  differenceInWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import { tr } from 'date-fns/locale';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import { FaPlus, FaRegClock } from 'react-icons/fa';
import { timeSlots } from '../constants';
import Modal from './Modal';
import { FaCalendarDays } from 'react-icons/fa6';
import { TbSoccerField } from 'react-icons/tb';

const Calendar = () => {
  // Tarih Methodları Başlangıç
  const [currentDate, setCurrentDate] = useState(new Date());
  const getNextWeek = (date) => {
    return addWeeks(date, 1);
  };

  const getPreviousWeek = (date) => {
    return subWeeks(date, 1);
  };
  const handlePreviousWeek = () => {
    setCurrentDate(getPreviousWeek(currentDate));
  };

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(startOfCurrentWeek, { weekStartsOn: 1 });

  const daysOfWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });

  const getWeekOfMonth = (date) => {
    const startOfMonthDate = startOfMonth(date);
    const startOfFirstWeek = startOfWeek(startOfMonthDate, { weekStartsOn: 1 });

    return differenceInWeeks(date, startOfFirstWeek) + 1;
  };

  const handleNextWeek = () => {
    setCurrentDate(getNextWeek(currentDate));
  };
  // Tarih Methodları Bitiş

  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  

  const handleCellClick = (itemSlot,itemId, day) => {
    setSelectedSlot({
      slot: itemSlot,
      id: itemId,
    });
    setSelectedDay(format(day, 'dd.MM.yyyy'));
    setOpen(true);
  };

  return (
    <div className="p-4 rounded-lg bg-green-200 w-full shadow-md">
      {/* Calendar Table*/}
      <div className="border border-gray-400 rounded-lg bg-gray-50 dark:bg-slate-700 overflow-hidden">
        <div className="flex p-3 items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-50">
            <FaCalendarDays size={28} />
            <h2 className="font-bold text-2xl">
              {format(currentDate, 'MMMM yyyy ', { locale: tr })} - {getWeekOfMonth(currentDate)}.
              hafta
            </h2>
          </div>
          <div className="flex gap-3 text-gray-800 dark:text-gray-50">
            <button onClick={handlePreviousWeek}>
              <CiCircleChevLeft size={28} />
            </button>
            <button onClick={handleNextWeek}>
              <CiCircleChevRight size={28} />
            </button>
          </div>
        </div>

        {/* Calendar Table Content*/}
        <div className="overflow-x-auto">
          <table className="calendar w-full text-center border-collapse">
            <thead>
              <tr className="border-t border-gray-400 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-50">
                <th className="p-2 border-gray-400">
                  <span className="inline-flex text-xl items-center justify-center gap-2 text">
                    <TbSoccerField size={24} className="rotate-90" />
                    Saha 1
                  </span>
                </th>
                {daysOfWeek.map((day, index) => (
                  <th key={index} className="py-2 border-l border-gray-400">
                    <div className="flex flex-col">
                      <span>{format(day, 'EEEE', { locale: tr })}</span>
                      <span>{format(day, 'dd.MM.yyyy')}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((item) => (
                <tr key={item.id} className="border-t border-gray-400">
                  <td className="p-2 border-r border-gray-400 text-gray-800 dark:text-gray-50">
                    <span className="inline-flex font-bold items-center w-full gap-2 justify-center">
                      <FaRegClock size={20} />
                      <span className="max-w-28 w-full">{item.slot}</span>
                    </span>
                  </td>
                  {daysOfWeek.map((day, index) => (
                    <td key={index} className="p-6 border-l border-gray-400">
                      <div className="flex justify-center items-center text-gray-800 dark:text-gray-50">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleCellClick(item.slot ,item.id, day)}
                        >
                          <FaPlus size={20} />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} setOpen={setOpen} timeSlot={selectedSlot} day={selectedDay} />
    </div>
  );
};

export default Calendar;
