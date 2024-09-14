const insertionSortingAlgorithm = function* (array) {
  const answer = array;

  yield [array, -1, -1];

  for (let i = 0; i < array.length; i++) {
    let tmp = array[i];
    let j;

    for (j = i - 1; j >= 0; j--) {
      if (array[j] > tmp) {
        array[j + 1] = array[j];
        yield [answer, i, j, tmp];
      } else {
        break;
      }
    }

    array[j + 1] = tmp;

    if (i === 0) {
      yield [answer, i, j, tmp];
    }
  }
};

export default insertionSortingAlgorithm;
