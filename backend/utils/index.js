export const dayController = (day) => {
  const today = new Date();
  const inputDate = new Date(day);

  if (inputDate < today) return false;

  return true;
};
