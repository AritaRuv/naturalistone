export function tokenDate() {
  const currentDate = new Date();

  const futureDate = new Date(currentDate.getTime() + 5 * 60 * 1000);

  const futureDateMilliseconds = futureDate.getTime();

  return futureDateMilliseconds;
}
