export function formattedDay(date) {
  const parseDate = new Date(date);
  const dayNumber = parseDate.getDay();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayNumber];
}
