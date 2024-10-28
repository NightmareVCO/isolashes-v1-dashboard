// if weekend, return next Monday
export const getFormattedCurrentWeekDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // if it's Saturday, add two days
  if (dayOfWeek === 6) {
    today.setDate(today.getDate() + 2);
  }
  // if it's Sunday, add one day
  else if (dayOfWeek === 0) {
    today.setDate(today.getDate() + 1);
  }

  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  return `${today.getFullYear()}-${month}-${day}`;
};

export const getFormattedCurrentDate = () => {
  const today = new Date();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  return `${today.getFullYear()}-${month}-${day}`;
};
