export default function* mergeSortAlgorithm(array) {
  yield [...array];
  const result = yield* divideFuntion(array);
  yield* mergeFuntion(result);
}

function* divideFuntion(array) {
  if (array.length === 1) return array;

  const pointIndex = Math.floor(array.length / 2);
  const frontArray = array.slice(0, pointIndex);
  const backArray = array.slice(pointIndex);

  const newArray = [...frontArray, null, ...backArray];
  const throwToYield = divideStepSupply(newArray);
  yield throwToYield;

  yield* divideFuntion(frontArray);
  yield* divideFuntion(backArray);

  return throwToYield;
}

const divideStepSupply = (() => {
  let stackArray = [];
  let nullRemove = new Set();

  return function (newArray) {
    if (stackArray.length === 0) {
      stackArray = newArray;
      return newArray;
    }

    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i] !== null) {
        const indexStack = stackArray.indexOf(newArray[i]);

        if (indexStack !== -1 && !nullRemove.has(indexStack)) {
          if (stackArray[indexStack - 1] !== null) {
            stackArray.splice(indexStack, 0, null);
            nullRemove.add(indexStack);
          }
        }
      }
    }

    return stackArray;
  };
})();

function* mergeFuntion(array) {
  const targetIndex = Math.floor(array.length / 2);
  let frontArray = array.slice(0, targetIndex);
  let backArray = array.slice(targetIndex);
  let result = [];
  let nullcount = 0;

  if (targetIndex % 2 !== 0) {
    frontArray = array.slice(0, targetIndex - 1);
    backArray = array.slice(targetIndex - 1);
  }

  for (let i = frontArray.length - 1; i >= 0; i--) {
    if (frontArray[i] === null && i !== 0 && i !== frontArray.length - 1) {
      frontArray.splice(i, 1);
      break;
    }
  }

  for (let i = backArray.length - 1; i >= 0; i--) {
    if (backArray[i] === null) {
      backArray.splice(i, 1);
      break;
    }
  }

  result = frontArray.concat(backArray);
  yield result;
  result = sortingFunction(result);
  yield result;

  for (let i = 0; i < result.length; i++) {
    if (result[i] === null) nullcount++;
  }

  if (nullcount > 1) {
    yield* mergeFuntion(result);
  }

  return result;
}

const sortingFunction = (array) => {
  let start = 0;

  while (start < array.length) {
    while (start < array.length && array[start] === null) {
      start++;
    }

    let end = start;

    while (end < array.length && array[end] !== null) {
      end++;
    }

    for (let i = start; i < end - 1; i++) {
      for (let j = start; j < end - 1 - (i - start); j++) {
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }

    start = end;
  }
  return array;
};
