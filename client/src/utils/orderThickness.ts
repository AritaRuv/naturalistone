export function compareValues(a, b) {
  const [numA1, numA2] = a.split("x").map(Number);
  const [numB1, numB2] = b.split("x").map(Number);

  if (numA1 !== numB1) {
    return numA1 - numB1;
  } else {
    return numA2 - numB2;
  }
}
