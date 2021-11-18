import moment from "moment";

export const getHours = (d) => {
  let totalHours = 0;
  for (let index = 0; index <= 10; index++) {
    totalHours = totalHours + d[`workedHours_${index}`];
  }
  return totalHours;
};

export const getAllowanceTypeByWorkedHours = (selectedTableRow) => {
  let type;
  for (let index = 0; index <= 10; index++) {
    if (selectedTableRow[`workedHours_${index}`]) {
      type = `workedHours_${index}`;
      break;
    }
  }
  return type;
};

export const getDateWorkedList = (startDate, endDate) => {
  let dateWorked = [];

  const start = moment(startDate, "YYYY-MM-DD");
  const end = moment(endDate, "YYYY-MM-DD");

  const diff = end.diff(start, "days");

  for (let index = 0; index <= diff; index++) {
    const formatedDay = moment(startDate, "YYYY-MM-DD")
      .clone()
      .add(index, "day")
      .format("YYYY-MM-DD");

    dateWorked.push(formatedDay);
  }

  return dateWorked;
};
