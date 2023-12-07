export function toK(number?: number) {
  number = Number(number);
  if (number >= 1000) {
    number = Math.round(Math.round(number * 1) / 1000);
    return `${number}k`;
  }
  return number
}
