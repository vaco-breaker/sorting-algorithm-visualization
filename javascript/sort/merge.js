export default function* mergeSortingAlgorithm(array) {
  yield [[...array]];

  const dividedArray = yield* divideProcess(array);
  yield* sortMergeProcess(dividedArray);
}

/**
 * 모든 배열들을 한 요소만 남을때까지 분할하는 함수입니다.
 * @param {Array<number>} array
 * @returns {Array}
 */
function* divideProcess(array) {
  let currentArray = [[...array]];

  while (currentArray.some((part) => Array.isArray(part) && part.length > 1)) {
    currentArray = yield* divide(currentArray);
  }
  yield currentArray;
  return currentArray;
}

/**
 * 배열을 2등분하고 그 기준점에 null 을 넣어 반환하는 함수입니다.
 * @param {Array<number>} array
 * @returns {Array}
 */
function* divide(array) {
  const result = [];
  let hasSplit = false;

  for (let part of array) {
    if (Array.isArray(part) && part.length > 1) {
      const pivot = Math.floor(part.length / 2);
      const front = part.slice(0, pivot);
      const back = part.slice(pivot);

      result.push(front, null, back);
      hasSplit = true;
    } else {
      result.push(part);
    }
  }

  if (hasSplit) {
    yield result;
  }

  return result;
}

/**
 * 모든 배열의 요소를 정렬하고 병합하는 함수입니다.
 * @param {Array<number>} array
 * @returns {Array}
 */
function* sortMergeProcess(array) {
  let currentArray = [...array];

  while (currentArray.length > 1) {
    const result = [];

    for (let i = 0; i < currentArray.length; i++) {
      if (
        Array.isArray(currentArray[i]) &&
        currentArray[i + 2] &&
        Array.isArray(currentArray[i + 2])
      ) {
        const merged = merge(currentArray[i], currentArray[i + 2]);
        result.push(merged);
        i += 2;
      } else {
        result.push(currentArray[i]);
      }
    }

    currentArray = result;
    yield currentArray;
  }

  yield currentArray;
}

/**
 * null 을 기준으로 하나하니씩 배열의 요소를 정렬하고 병합하는 함수입니다.
 * @param {Array<number>} target
 * @param {Array<number>} comparisonTarget
 * @returns {Array}
 */
function merge(target, comparisonTarget) {
  const merged = [];
  let i = 0;
  let j = 0;

  while (i < target.length && j < comparisonTarget.length) {
    if (target[i] <= comparisonTarget[j]) {
      merged.push(target[i++]);
    } else {
      merged.push(comparisonTarget[j++]);
    }
  }

  return merged.concat(target.slice(i)).concat(comparisonTarget.slice(j));
}
