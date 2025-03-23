
const leftZero = (n: number) =>
  n >= 10 ? n : `0${n}`


const dayOfWeekConversion: Record<number, string> = {
  0: "Domingo",
  1: "Segunda-feira",
  2: "Terça-feira",
  3: "Quarta-feira",
  4: "Quinta-feira",
  5: "Sexta-feira",
  6: "Sábado",
}

export function formatDate(date: Date) {
  const hour = leftZero(date.getHours());
  const minutes = leftZero(date.getMinutes());
  
  const day = leftZero(date.getDate());
  const month = leftZero(date.getMonth());
  const year = leftZero(date.getFullYear());

  const dayOfWeek = dayOfWeekConversion[date.getDay()];

  return `${dayOfWeek}, ${hour}:${minutes} ${day}/${month}/${year}`
}