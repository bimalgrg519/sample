import { COMPANY_ID } from "../constants/constants";

export const getBatchBody = ({ id, linesData, status, remarks }) => {
  // for lines
  let batchBody = linesData.map((line) => ({
    method: "PATCH",
    url: `companies(${COMPANY_ID})/timesheetlines(${line.id})`,
    body: {
      status,
    },
    headers: {
      "Content-Type": "application/json",
      "If-Match": "*",
    },
  }));

  // for headers
  batchBody = [
    ...batchBody,
    {
      method: "PATCH",
      url: `companies(${COMPANY_ID})/timesheetemployees(${id})`,
      body: {
        status,
        remarks: remarks ? remarks : "",
      },
      headers: {
        "Content-Type": "application/json",
        "If-Match": "*",
      },
    },
  ];

  return batchBody;
};
