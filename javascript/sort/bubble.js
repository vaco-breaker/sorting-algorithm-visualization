function* bubbleUp(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        yield [arr, i, j];
      } else {
        yield [arr, i, j];
      }
    }
  }
  return arr;
}

export default bubbleUp;
