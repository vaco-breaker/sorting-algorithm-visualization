// merge algorithm 구현

export const divideArray = function (array) {
  const LENGTH = array.length;
  const finalArray = [[...array]];

  while (true) {
    let newArray = [];

    if (finalArray[finalArray.length - 1].length === LENGTH) {
      const prevArray = finalArray[finalArray.length - 1];

      const pivot = Math.floor(prevArray.length / 2);
      const left = prevArray.slice(0, pivot);
      const right = prevArray.slice(pivot, prevArray.length);

      newArray.push(left);
      newArray.push(right);

      finalArray.push(newArray);
      continue;
    } else {
      for (let i = 0; i < finalArray[finalArray.length - 1].length; i++) {
        const prevArray = finalArray[finalArray.length - 1][i];

        if (prevArray.length === 1) {
          continue;
        } else {
          if (i > 0 && finalArray[finalArray.length - 1][i - 1].length === 1) {
            const prototype = [...array];
            const emptyArray = [];

            prototype.forEach((value) => {
              emptyArray.push([value]);
            });

            finalArray.push(emptyArray);

            break;
          } else {
            const pivot = Math.floor(prevArray.length / 2);
            const left = prevArray.slice(0, pivot);
            const right = prevArray.slice(pivot, prevArray.length);

            newArray.push(left);
            newArray.push(right);
          }
        }
      }
    }

    if (newArray.length === LENGTH) finalArray.push(newArray);

    if (finalArray[finalArray.length - 1].length === LENGTH) {
      break;
    } else {
      finalArray.push(newArray);
    }
  }

  return finalArray;
};

export const mergeArray = function (left, right) {
  const result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());

  return result;
};
