// insertion algorithm 구현

const insertionSortAlgorithm = function* (arr) {
  const answer = arr;

  for (let i = 0; i < arr.length; i++) {
    let tmp = arr[i];
    let j;

    for (j = i - 1; j >= 0; j--) {
      if (arr[j] > tmp) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }

    arr[j + 1] = tmp;

    yield answer;
  }
};

export default insertionSortAlgorithm;
