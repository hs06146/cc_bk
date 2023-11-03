export function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const nowDate = `${year}-${month}-${day}`;
  return nowDate;
}
