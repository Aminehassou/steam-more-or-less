export enum Color {
  Red = "red",
  Green = "green",
}

export function getTwoRandomIndexes(range: number): number[] {
  let numberOne = 0;
  let numberTwo = 0;

  numberOne = Math.floor(Math.random() * range);
  do {
    numberTwo = Math.floor(Math.random() * range);
  } while (numberTwo === numberOne);
  return [numberOne, numberTwo];
}
