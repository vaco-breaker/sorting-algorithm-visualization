import selectionSortingAlgorithm from './sort/selection.js';
import bubbleUp from './sort/bubble.js';

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
      animation(bubbleUp(targetArray));
      break;
    case SORT_OPTIONS.INSERTION:
      console.log('Insertion Sort Clicked!');
      console.log(targetArray);
      break;
    case SORT_OPTIONS.MERGE:
      console.log('Merge Sort Clicked!');
      console.log(targetArray);
      break;
    case SORT_OPTIONS.SELECTION:
      console.log('Selection Sort Clicked!');
      animation(selectionSortingAlgorithm(targetArray));
      break;
    default:
      break;
  }
};

const pickSortingAlgorithmCallback = () => {
  const inputValueArray = $numberInput.value
    .split(' ')
    .filter((value) => value !== '' && value !== ' ');

  createBarArray(inputValueArray);
  const numberArray = inputValueArray.map(Number);
  pickSortingAlgorithm(selectedSortOption, numberArray);
};

/**
 * DOM 에 접근하여 배열에 맞는 막대를 그려주는 함수입니다.
 * @param {Array<Number>} array
 */
const createBarArray = (array) => {
  $showSortingNumbers.innerHTML = '';

  array.forEach((number, index) => {
    const newElement = document.createElement('div');
    newElement.textContent = number;
    newElement.style.height = `${number * 5}px`;
    newElement.classList.add('sortingArrayElement');
    newElement.id = number;
    newElement.dataset.index = index;

    $showSortingNumbers.appendChild(newElement);
  });
};

const animation = async (generator) => {
  deactivateEvent();

  for (let yieldArray of generator) {
    createBarArray(yieldArray);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  activateEvent();
};

const activateEvent = () => {
  $numberInput.addEventListener('input', changeNumberInput);
    $sortOptionBox.addEventListener('click', clickSortOptions);
    $submitButton.addEventListener('click', pickSortingAlgorithmCallback);
};

const deactivateEvent = () => {
  $numberInput.removeEventListener('input', changeNumberInput);
  $sortOptionBox.removeEventListener('click', clickSortOptions);
  $submitButton.removeEventListener('click', pickSortingAlgorithmCallback);
};

activateEvent();
