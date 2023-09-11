export function sortedFractions(fractions) {
  if (fractions !== undefined) {
    return fractions.sort((a, b) => {
      const [numA, denA] = a.split("/").map(Number);
      const [numB, denB] = b.split("/").map(Number);

      return numA / denA - numB / denB;
    });
  }
}
