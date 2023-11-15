export function getToday() {
  const createdAt = new Date();
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth() + 1;
  const day = createdAt.getDate();
  const today = `${year}-${month}-${day}`;
  return today;
}
