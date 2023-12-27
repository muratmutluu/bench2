export const dayController = (day) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const inputDate = new Date(day);
  console.log(today);
  console.log(inputDate);
  if (inputDate < today) return false;

  return true;
};
