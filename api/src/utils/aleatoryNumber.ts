export function aleatoryNumber(minimo: number, maximo: number) {
  return Math.round(Math.random() * (maximo - minimo) + minimo);
}
