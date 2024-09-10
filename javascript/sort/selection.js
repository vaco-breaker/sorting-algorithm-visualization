export default function* selectionSortingAlgorithm(array) {
  yield array;

  for (let i = 0; i < array.length; i++) {
    let lowestIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[lowestIndex]) {
        lowestIndex = j;
      }
    }

    if (lowestIndex !== i) {
      [array[i], array[lowestIndex]] = [array[lowestIndex], array[i]];
      yield array;
    }
  }
}
