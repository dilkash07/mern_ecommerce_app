export function formattedDate(date) {
  const parseDate = new Date(date);
  if (isNaN(parseDate)) {
    return;
  }
  if (date === null) {
    return;
  }
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    parseDate
  );
  return formattedDate;
}

export function estimatedDate(date) {
  const currentDate = new Date();
  const estDate = new Date(currentDate);
  estDate.setDate(currentDate.getDate() + date);
  const estimatedDate = formattedDate(estDate);
  return estimatedDate;
}
