function* bubbleSortingAlgorithm(array) {
  yield [array, -1, -1];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        yield [array, i, j];
      } else {
        yield [array, i, j];
      }
    }
  }

  return array;
}

export default bubbleSortingAlgorithm;
