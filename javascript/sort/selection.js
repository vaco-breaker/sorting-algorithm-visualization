export default function* selectionSortingAlgorithm(array) {
  for (let i = 0; i < array.length; i++) {
    let lowestIndex = i;
    let j;

    if (i === 0) {
      yield [array, i, j, lowestIndex];
    }

    for (j = i + 1; j < array.length; j++) {
      if (array[j] < array[lowestIndex]) {
        lowestIndex = j;
      }
      yield [array, i, j, lowestIndex];
    }

    if (lowestIndex !== i) {
      [array[i], array[lowestIndex]] = [array[lowestIndex], array[i]];
    }

    if (i === array.length - 1) {
      yield [array, i, j, lowestIndex];
    }
  }
}
