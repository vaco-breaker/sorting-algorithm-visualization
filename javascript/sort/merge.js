export default function* mergeSortingAlgorithm(array) {
  // 전체 배열의 초기 상태 시각화
  yield [[...array]];

  const dividedArray = yield* fullDivideProcess(array);

  console.log('분할 끝!');
  console.log('정복 시작!');

  yield* conquerMergeProcess(dividedArray);
}

function* splitToSmallerParts(fullArray) {
  const result = [];
  let hasSplit = false;

  for (let part of fullArray) {
    if (Array.isArray(part) && part.length > 1) {
      const middle = Math.floor(part.length / 2);
      const left = part.slice(0, middle);
      const right = part.slice(middle);

      result.push(left, null, right);
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

function* fullDivideProcess(fullArray) {
  let currentArray = [[...fullArray]]; // 초기 배열을 감싼 형태로 시작

  // 배열 안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트
  while (currentArray.some((part) => Array.isArray(part) && part.length > 1)) {
    currentArray = yield* splitToSmallerParts(currentArray);
  }
  yield currentArray;
  return currentArray;
}

function merge(left, right) {
  let merged = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      merged.push(left[i++]);
    } else {
      merged.push(right[j++]);
    }
  }
  return merged.concat(left.slice(i)).concat(right.slice(j));
}

function* conquerMergeProcess(fullArray) {
  let currentArray = [...fullArray]; // 초기 배열 상태

  // 정복 단계 - 부분 배열들을 병합
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
        i += 2; // 병합된 부분을 건너뜀
      } else {
        result.push(currentArray[i]);
      }
    }

    currentArray = result;
    yield currentArray; // 병합 단계마다 상태를 yield
  }

  yield currentArray; // 최종 병합 완료 상태
}
