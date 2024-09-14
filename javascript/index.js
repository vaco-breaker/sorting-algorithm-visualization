import selectionSortingAlgorithm from './sort/selection.js';
import bubbleSortingAlgorithm from './sort/bubble.js';
import insertionSortingAlgorithm from './sort/insertion.js';
import mergeSortingAlgorithm from './sort/merge.js';

const $sortOptionBox = document.querySelector('.sort-option-box');
const $sortOptions = $sortOptionBox.querySelectorAll('li');
const $numberInput = document.querySelector('#numberInput');
const $errorMessage = document.querySelector('#errorMessage');
const $titleBox = document.querySelector('.title-box');
const $title = $titleBox.querySelector('#title');
const $iconCompleted = $titleBox.querySelector('img');
const $submitButton = document.querySelector('#submitButton');
const $showSortingNumbers = document.querySelector('#showSortingNumbers');

const SORT_OPTIONS = Object.freeze({
  BUBBLE: 'bubbleSort',
  INSERTION: 'insertionSort',
  MERGE: 'mergeSort',
  SELECTION: 'selectionSort',
});

let selectedSortOption = SORT_OPTIONS.BUBBLE;

class PreviousArray {
  constructor() {
    this.value = null;
  }

  setPreviousArray(array) {
    this.value = array.slice();
  }
}

const previousArray = new PreviousArray();

const changeNumberInput = (e) => {
  const regExp = /^[0-9 ]*$/;
  const currentValue = e.target.value;

  if (!regExp.test(currentValue)) {
    $errorMessage.textContent = '숫자와 띄어쓰기만 입력 가능합니다!';
    e.target.value = currentValue.replace(/[^0-9 ]/g, '');
  } else {
    $errorMessage.textContent = '';
  }

  e.target.value = e.target.value.replace(/ +(?= )/g, '');
};

const clickSortOptions = (e) => {
  initUi();

  $sortOptions.forEach((el) => {
    if (el.id === e.target.id) {
      $title.textContent = el.textContent;
      el.classList.add('selected');
    } else if (e.target.tagName === 'LI') {
      el.classList.remove('selected');
    }
  });

  selectedSortOption = e.target.id;
};

const pickSortingAlgorithm = (option, targetArray) => {
  switch (option) {
    case SORT_OPTIONS.BUBBLE:
      animation(bubbleSortingAlgorithm(targetArray), SORT_OPTIONS.BUBBLE);
      break;
    case SORT_OPTIONS.INSERTION:
      animation(insertionSortingAlgorithm(targetArray), SORT_OPTIONS.INSERTION);
      break;
    case SORT_OPTIONS.MERGE:
      animation(mergeSortingAlgorithm(targetArray), SORT_OPTIONS.MERGE);
      break;
    case SORT_OPTIONS.SELECTION:
      animation(selectionSortingAlgorithm(targetArray), SORT_OPTIONS.SELECTION);
      break;
    default:
      break;
  }
};

const pickSortingAlgorithmCallback = (e) => {
  initUi();

  if (e.key === 'Enter' || e.type === 'click') {
    const numberArray = $numberInput.value
      .split(' ')
      .filter((value) => value !== '' && value !== ' ')
      .map(Number);

    if (numberArray.length === 0) {
      return;
    }

    // createBarArray(numberArray, 1);
    pickSortingAlgorithm(selectedSortOption, numberArray);
  }
};

/**
 * DOM 에 접근하여 배열에 맞는 막대를 그려주는 함수입니다.
 * @param {Array<Number>} array
 */
const createBarArray = (array, step, fixedIndexArray, beingSortedIndexArray, tmpInfo) => {
  $showSortingNumbers.innerHTML = '';
  const maxNumber = Math.max(...array);

  if ((!tmpInfo && step === 1) || tmpInfo) {
    array.forEach((number, index) => {
      const newElement = document.createElement('div');
      const textContent = tmpInfo ? (tmpInfo[0] === index ? tmpInfo[1] : number) : number;
      newElement.textContent = textContent;
      const percentHeight = (textContent / maxNumber) * 100;
      newElement.style.height = `${percentHeight}%`;
      newElement.classList.add('sorting-array-element');

      if (fixedIndexArray && fixedIndexArray.includes(index)) {
        newElement.classList.add('sorted-fixed');
      }

      if (beingSortedIndexArray && beingSortedIndexArray.includes(index)) {
        newElement.classList.add('being-sorted-highest');
      }

      newElement.id = number;
      newElement.dataset.index = index;
      $showSortingNumbers.appendChild(newElement);

      previousArray.setPreviousArray(array);
    });
  } else {
    previousArray.value.forEach((number, index) => {
      const newElement = document.createElement('div');
      const textContent = tmpInfo ? (tmpInfo[0] === index ? tmpInfo[1] : number) : number;
      newElement.textContent = textContent;
      const percentHeight = (textContent / maxNumber) * 100;
      newElement.style.height = `${percentHeight}%`;
      newElement.style.transition = 'all 1s';
      newElement.classList.add('sorting-array-element');

      newElement.id = number;
      newElement.dataset.index = index;
      $showSortingNumbers.appendChild(newElement);
    });

    const allSortingElement = document.querySelectorAll('.sorting-array-element');

    Array.from(allSortingElement).forEach((element, index) => {
      if (element.textContent !== array[index]) {
        const textContent = tmpInfo
          ? tmpInfo[0] === index
            ? tmpInfo[1]
            : array[index]
          : array[index];
        element.textContent = textContent;
        requestAnimationFrame(() => animatingByHeight(element, textContent, maxNumber));
      }

      if (fixedIndexArray && fixedIndexArray.includes(index)) {
        element.classList.add('sorted-fixed');
      }

      if (beingSortedIndexArray && beingSortedIndexArray.includes(index)) {
        element.classList.add('being-sorted-highest');
      }

      previousArray.setPreviousArray(array);
    });
  }
};

const animatingByHeight = (element, height, maxNumber) => {
  element.style.height = `${(height / maxNumber) * 100}%`;

  requestAnimationFrame(() => animatingByHeight(element, height, maxNumber));
};

const animation = async (generator, sortType) => {
  deactivateEvent();
  let isFirst = true;
  let step = 0;

  for (let yieldArray of generator) {
    if (isFirst) {
      $showSortingNumbers.classList.add('intro-animation');
      isFirst = false;
    }

    step += 1;

    const array = sortType === SORT_OPTIONS.MERGE ? yieldArray : yieldArray[0];
    const fixedIndexArray = checkWhichFixed(yieldArray, sortType);
    const beingSortedIndexArray = checkWhichBeingSorted(yieldArray, sortType);

    if (sortType === SORT_OPTIONS.INSERTION) {
      createBarArray(array, step, fixedIndexArray, beingSortedIndexArray, [
        yieldArray[2],
        yieldArray[3],
      ]);
    } else {
      createBarArray(array, step, fixedIndexArray, beingSortedIndexArray);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const $numberBars = document.querySelectorAll('.sorting-array-element');
  $numberBars.forEach((tag) => tag.classList.add('sorted-completed-bar'));
  $iconCompleted.classList.add('completed');

  activateEvent();
};

const checkWhichFixed = (yieldArray, sortType) => {
  switch (sortType) {
    case SORT_OPTIONS.BUBBLE:
      if (yieldArray[1] === 0 || yieldArray[1] === -1) {
        return null;
      } else {
        const previouslyFixedIndex = yieldArray[0].length - yieldArray[1];
        const array = Array(yieldArray[0].length)
          .fill(null)
          .map((_, index) => index)
          .filter((value) => value >= previouslyFixedIndex);
        return array;
      }
    case SORT_OPTIONS.INSERTION:
      const previouslyFixedIndex = yieldArray[1];
      const array = Array(yieldArray[0].length)
        .fill(null)
        .map((_, index) => index)
        .filter((value) => value <= previouslyFixedIndex);
      return array;
    case SORT_OPTIONS.MERGE:
      break;
    case SORT_OPTIONS.SELECTION:
      if (yieldArray[1] === 0) {
        return null;
      } else {
        const previouslyFixedIndex = yieldArray[1] - 1;
        const array = Array(yieldArray[0].length)
          .fill(null)
          .map((_, index) => index)
          .filter((value) => value <= previouslyFixedIndex);
        return array;
      }
    default:
      break;
  }
};

const checkWhichBeingSorted = (yieldArray, sortType) => {
  switch (sortType) {
    case SORT_OPTIONS.BUBBLE:
      if (yieldArray[2] === -1) return null;
      return [yieldArray[2], yieldArray[2] + 1];
    case SORT_OPTIONS.INSERTION:
      if (yieldArray[2] === -1) {
        return null;
      } else {
        return [yieldArray[2]];
      }
    case SORT_OPTIONS.MERGE:
      break;
    case SORT_OPTIONS.SELECTION:
      return [yieldArray[2], yieldArray[3]];
    default:
      break;
  }
};

const initUi = () => {
  $showSortingNumbers.innerHTML = '';
  $iconCompleted.classList.remove('completed');
};

const activateEvent = () => {
  $numberInput.addEventListener('input', changeNumberInput);
  $sortOptionBox.addEventListener('click', clickSortOptions);
  $submitButton.addEventListener('click', pickSortingAlgorithmCallback);
  $numberInput.addEventListener('keyup', pickSortingAlgorithmCallback);
  $submitButton.classList.remove('disabled');
  $sortOptionBox.classList.remove('disabled');
  $numberInput.removeAttribute('disabled');
  $showSortingNumbers.classList.remove('intro-animation');
};

const deactivateEvent = () => {
  $numberInput.removeEventListener('input', changeNumberInput);
  $sortOptionBox.removeEventListener('click', clickSortOptions);
  $submitButton.removeEventListener('click', pickSortingAlgorithmCallback);
  $numberInput.removeEventListener('keyup', pickSortingAlgorithmCallback);
  $submitButton.classList.add('disabled');
  $sortOptionBox.classList.add('disabled');
  $numberInput.setAttribute('disabled', true);
};

activateEvent();
