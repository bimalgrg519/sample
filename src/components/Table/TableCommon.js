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

  const start = moment(startDate);
  const end = moment(endDate);

  const diff = end.diff(start, "days");

  for (let index = 0; index <= diff; index++) {
    const formatedDay = start.clone().add(index, "day").format("DD-MM-YYYY");

    dateWorked.push(formatedDay);
  }

  return dateWorked;
};
