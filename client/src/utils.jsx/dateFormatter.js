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
