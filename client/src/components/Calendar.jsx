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
import useFetch from '../hooks/useFetch';

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
  const handleNextWeek = () => {
    setCurrentDate(getNextWeek(currentDate));
  };

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(startOfCurrentWeek, { weekStartsOn: 1 });

  const daysOfWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });

  const getWeekOfMonth = (date) => {
    const startOfMonthDate = startOfMonth(date);
    const startOfFirstWeek = startOfWeek(startOfMonthDate, { weekStartsOn: 1 });

    return differenceInWeeks(date, startOfFirstWeek) + 1;
  };

  // Tarih Methodları Bitiş

  const { data, reFetch } = useFetch('/api/reservations');

  const reservedSlots = data.map((reservation) => {
    return {
      date: format(reservation.reservation_date, 'yyyy-MM-dd'),
      time_id: reservation.time_id,
      status: reservation.status,
    };
  });

  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [selectedDay, setSelectedDay] = useState(new Date());

  const handleCellClick = (itemSlot, itemId, day) => {
    setSelectedSlot({
      slot: itemSlot,
      id: itemId,
    });
    setSelectedDay(format(day, 'yyyy-MM-dd'));
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
                  {daysOfWeek.map((day, index) => {
                    const isReserved = reservedSlots.some(
                      (reservedSlot) =>
                        reservedSlot.date === format(day, 'yyyy-MM-dd') &&
                        reservedSlot.time_id === item.id
                    );
                    const isCompleted = reservedSlots.some(
                      (reservedSlot) =>
                        reservedSlot.date === format(day, 'yyyy-MM-dd') &&
                        reservedSlot.time_id === item.id &&
                        reservedSlot.status === 1
                    );

                    const isTimeExpired =
                      new Date(new Date().setDate(new Date().getDate() - 1)) > new Date(day);

                    const cellStyle = isReserved
                      ? isCompleted
                        ? 'bg-yellow-400 cursor-not-allowed text-gray-700'
                        : 'bg-red-500 cursor-not-allowed'
                      : isTimeExpired
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-green-400 cursor-pointer hover:bg-green-500';
                    return (
                      <td
                        key={index}
                        className="border-l border-gray-400 text-white font-bold text-md"
                      >
                        <div className={cellStyle}>
                          {isReserved ? (
                            <div className="flex justify-center items-center p-6">
                              {isCompleted ? 'BİTTİ' : 'DOLU'}
                            </div>
                          ) : (
                            <div
                              onClick={() => handleCellClick(item.slot, item.id, day)}
                              className="flex justify-center items-center p-6"
                            >
                              {isTimeExpired ? 'GEÇMİŞ' : <FaPlus size={24} />}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        setOpen={setOpen}
        timeSlot={selectedSlot}
        day={selectedDay}
        reFetch={reFetch}
      />
    </div>
  );
};

export default Calendar;
