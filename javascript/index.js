import selectionSortingAlgorithm from './sort/selection.js';
import bubbleUp from './sort/bubble.js';
import insertionSortAlgorithm from './sort/insertion.js';
import { divideArray, mergeArray } from './sort/merge.js';

const $sortOptionBox = document.querySelector('.sort-option-box');
const $sortOptions = $sortOptionBox.querySelectorAll('li');
const $numberInput = document.querySelector('#numberInput');
const $errorMessage = document.querySelector('#errorMessage');
const $submitButton = document.querySelector('#submitButton');
const $showSortingNumbers = document.querySelector('#showSortingNumbers');

const SORT_OPTIONS = Object.freeze({
  BUBBLE: 'bubbleSort',
  INSERTION: 'insertionSort',
  MERGE: 'mergeSort',
  SELECTION: 'selectionSort',
});

let selectedSortOption = SORT_OPTIONS.BUBBLE;

const changeNumberInput = (e) => {
  const regExp = /[0-9 ]/g;

  if (!regExp.test(e.target.value)) {
    $errorMessage.textContent = '숫자와 띄어쓰기만 입력 가능합니다!';
  } else {
    $errorMessage.textContent = '';
  }

  e.target.value = e.target.value.replace(/ +(?= )|[^0-9 ]/g, '');
};

const clickSortOptions = (e) => {
  $sortOptions.forEach((el) => {
    if (el.id === e.target.id) {
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
      console.log('Bubble Sort Clicked!');
      animation(bubbleUp(targetArray), SORT_OPTIONS.BUBBLE);
      break;
    case SORT_OPTIONS.INSERTION:
      console.log('Insertion Sort Clicked!');
      animation(insertionSortAlgorithm(targetArray), SORT_OPTIONS.INSERTION);
      break;
    case SORT_OPTIONS.MERGE:
      console.log('Merge Sort Clicked!');
      animation(divideArray(targetArray), mergeArray);

      break;
    case SORT_OPTIONS.SELECTION:
      console.log('Selection Sort Clicked!');
      animation(selectionSortingAlgorithm(targetArray), SORT_OPTIONS.SELECTION);
      break;
    default:
      break;
  }
};

const pickSortingAlgorithmCallback = (e) => {
  if (e.key === 'Enter' || e.type === 'click') {
    const numberArray = $numberInput.value
      .split(' ')
      .filter((value) => value !== '' && value !== ' ')
      .map(Number);

    createBarArray(numberArray);
    pickSortingAlgorithm(selectedSortOption, numberArray);
  }
};

/**
 * DOM 에 접근하여 배열에 맞는 막대를 그려주는 함수입니다.
 * @param {Array<Number>} array
 */
const createBarArray = (array, fixedIndexArray, beingSortedIndex, tmpInfo) => {
  $showSortingNumbers.innerHTML = '';
  const maxNumber = Math.max(...array);

  array.forEach((number, index) => {
    const newElement = document.createElement('div');
    newElement.textContent = tmpInfo
      ? tmpInfo[0] === index
        ? tmpInfo[1]
        : number
      : number;
    const percentHeight =
      ((tmpInfo ? (tmpInfo[0] === index ? tmpInfo[1] : number) : number) /
        maxNumber) *
      100;
    newElement.style.height = `${percentHeight}%`;
    newElement.classList.add('sorting-array-element');

    if (fixedIndexArray && fixedIndexArray.includes(index)) {
      newElement.classList.add('sorted-fixed');
    }
    if (index === beingSortedIndex) {
      newElement.classList.add('being-sorted');
    }

    newElement.id = number;
    newElement.dataset.index = index;
    $showSortingNumbers.appendChild(newElement);
  });
};

const animation = async (generator, sortType) => {
  deactivateEvent();
  let isFirst = true;

  for (let yieldArray of generator) {
    if (isFirst) {
      $showSortingNumbers.classList.add('fade-in');
      isFirst = false;
    }

    const array = yieldArray[0];
    const fixedIndexArray = checkWhichFixed(yieldArray, sortType);
    const beingSortedIndex = checkWhichBeingSorted(yieldArray, sortType);

    if (sortType === SORT_OPTIONS.INSERTION) {
      createBarArray(array, fixedIndexArray, beingSortedIndex, [
        yieldArray[2],
        yieldArray[3],
      ]);
    } else {
      createBarArray(array, fixedIndexArray, beingSortedIndex);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  const $numberBars = document.querySelectorAll('.sorting-array-element');
  $numberBars.forEach((tag) => tag.classList.add('sorted-completed'));

  activateEvent();
};

const checkWhichFixed = (yieldArray, sortType) => {
  if (sortType === SORT_OPTIONS.BUBBLE) {
    if (yieldArray[1] === 0) {
      return null;
    } else {
      const previouslyFixedIndex = yieldArray[0].length - yieldArray[1];
      const array = Array(yieldArray[0].length)
        .fill(null)
        .map((_, index) => index)
        .filter((value) => value >= previouslyFixedIndex);
      return array;
    }
  } else if (sortType === SORT_OPTIONS.INSERTION) {
    const previouslyFixedIndex = yieldArray[1];
    const array = Array(yieldArray[0].length)
      .fill(null)
      .map((_, index) => index)
      .filter((value) => value <= previouslyFixedIndex);
    return array;
  }
};

const checkWhichBeingSorted = (yieldArray, sortType) => {
  if (sortType === SORT_OPTIONS.BUBBLE) {
    return yieldArray[2];
  } else if (sortType === SORT_OPTIONS.INSERTION) {
    if (yieldArray[2] === -1) {
      return null;
    } else {
      return yieldArray[2];
    }
  }
};

const activateEvent = () => {
  $numberInput.addEventListener('input', changeNumberInput);
  $sortOptionBox.addEventListener('click', clickSortOptions);
  $submitButton.addEventListener('click', pickSortingAlgorithmCallback);
  $numberInput.addEventListener('keyup', pickSortingAlgorithmCallback);
  $submitButton.classList.remove('disabled');
  $sortOptionBox.classList.remove('disabled');
  $numberInput.removeAttribute('disabled');
  $showSortingNumbers.classList.remove('fade-in');
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
