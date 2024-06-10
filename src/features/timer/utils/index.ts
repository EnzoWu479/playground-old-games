export const hourConversion = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return {
    hours,
    minutes,
    seconds,
  };
};
export const hourFormated = (time: number) => {
  const timeConverted = hourConversion(time);
  return `${String(timeConverted.hours).padStart(2, "0")}:${String(
    timeConverted.minutes
  ).padStart(2, "0")}:${String(timeConverted.seconds).padStart(2, "0")}`;
};
