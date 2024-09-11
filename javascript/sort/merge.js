const mergeFuntion = (front, back) => {
  const resultArray = [];

  while (front.length !== 0 && back.length !== 0) {
    front[0] <= back[0]
      ? resultArray.push(front.shift())
      : resultArray.push(back.shift());
  }

  if (front.length === 0) resultArray.push(...back);
  if (back.length === 0) resultArray.push(...front);
  return resultArray;
};

export function* divideFuntion(array) {
  if (array.length === 1) return array;

  const pointIndex = Math.floor(array.length / 2);
  const frontArray = array.slice(0, pointIndex);
  const backArray = array.slice(pointIndex);

  const newArray = [...frontArray, null, ...backArray];
  const test = inging(newArray);
  console.log(test);
  yield test;

  const yFront = yield* divideFuntion(frontArray);
  const yBack = yield* divideFuntion(backArray);

  const result = mergeFuntion(yFront, yBack);

  return result;
}

const inging = (() => {
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
