function* bubbleUp(arr) {
  yield arr;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        console.log(arr[j], arr[j + 1]);
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        yield arr;
      } else {
        yield arr;
      }
    }
  }
  return arr;
}

export default bubbleUp;
