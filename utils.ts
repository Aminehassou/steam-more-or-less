export enum Color {
  Red = "red",
  Green = "green",
}

function getTwoRandomIndexes(range: number): number[] {
  let numberOne = 0;
  let numberTwo = 0;

  numberOne = Math.floor(Math.random() * range);
  do {
    numberTwo = Math.floor(Math.random() * range);
  } while (numberTwo === numberOne);
  return [numberOne, numberTwo];
}
function getOneRandomIndex(range: number): number {
  let numberOne = 0;

  numberOne = Math.floor(Math.random() * range);

  return numberOne;
}

export { getTwoRandomIndexes, getOneRandomIndex };
