// insertion algorithm 구현

const insertionSortAlgorithm = function* (arr) {
  const answer = arr;

  for (let i = 0; i < arr.length; i++) {
    let tmp = arr[i];
    let j;

    for (j = i - 1; j >= 0; j--) {
      if (arr[j] > tmp) {
        arr[j + 1] = arr[j];
        yield [answer, i, j, tmp];
      } else {
        break;
      }
    }

    arr[j + 1] = tmp;

    if (i === 0) {
      yield [answer, i, j, tmp];
    }
  }
};

export default insertionSortAlgorithm;
