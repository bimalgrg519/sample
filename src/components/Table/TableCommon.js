export const getHours = (d) => {
  let totalHours = 0;
  for (let index = 0; index <= 10; index++) {
    totalHours = totalHours + d[`workedHours_${index}`];
  }
  return totalHours;
};
