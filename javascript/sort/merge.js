// merge algorithm 구현

const divideArray = function (array) {
  const LENGTH = array.length;
  const finalArray = [[...array]];

  while (true) {
    const newArray = [];
    let lastCase = false;

    if (finalArray[finalArray.length - 1].length === LENGTH) {
      const prevArray = finalArray[finalArray.length - 1];

      const pivot = Math.floor(prevArray.length / 2); // 대략 반으로 쪼개는 코드
      const left = prevArray.slice(0, pivot); // 쪼갠 왼쪽
      const right = prevArray.slice(pivot, prevArray.length); // 쪼갠 오른쪽

      newArray.push(left);
      newArray.push(right);
    } else {
      for (let i = 0; i < finalArray[finalArray.length - 1].length; i++) {
        const prevArray = finalArray[finalArray.length - 1][i];

        if (prevArray.length === 1) {
          lastCase = true;
          continue;
        } else {
          const pivot = Math.floor(prevArray.length / 2); // 대략 반으로 쪼개는 코드
          const left = prevArray.slice(0, pivot); // 쪼갠 왼쪽
          const right = prevArray.slice(pivot, prevArray.length); // 쪼갠 오른쪽

          newArray.push(left);
          newArray.push(right);
        }
      }
    }

    if (!lastCase) {
      finalArray.push(newArray);
    } else {
      const finalElement = finalArray[finalArray.length - 1];
      finalElement.splice(finalElement.length - 1, 1, ...newArray);
      break;
    }
  }

  return finalArray;
};

const mergeArray = function* (left, right) {
  const result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      // 두 배열의 첫 원소를 비교하여
      result.push(left.shift()); // 더 작은 수를 결과에 넣어줍니다.
    } else {
      result.push(right.shift()); // 오른쪽도 마찬가지
    }
  }

  while (left.length) result.push(left.shift()); // 어느 한 배열이 더 많이 남았다면 나머지를 다 넣어줍니다.
  while (right.length) result.push(right.shift()); // 오른쪽도 마찬가지

  yield result;
};
