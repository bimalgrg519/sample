export const changeDateToUkFormat = (d) => {
  const apiDateFormat = d?.split("-");
  const ukDateFormat = [
    apiDateFormat[2],
    apiDateFormat[1],
    apiDateFormat[0],
  ].join("-");
  return ukDateFormat;
};
