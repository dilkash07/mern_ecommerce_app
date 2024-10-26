const moment = require("moment");

exports.getDateRange = (period) => {
  if (period === "day") {
    return {
      startDate: moment().startOf(period),
      endDate: moment().endOf(period),
    };
  }
  if (period === "week") {
    return {
      startDate: moment().startOf(period),
      endDate: moment().endOf(period),
    };
  }
  if (period === "month") {
    return {
      startDate: moment().startOf(period),
      endDate: moment().endOf(period),
    };
  }
};
