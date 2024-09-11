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
      animation(bubbleUp(targetArray));
      break;
    case SORT_OPTIONS.INSERTION:
      console.log('Insertion Sort Clicked!');
      animation(insertionSortAlgorithm(targetArray));
      break;
    case SORT_OPTIONS.MERGE:
      console.log('Merge Sort Clicked!');
      animation(divideArray(targetArray), mergeArray);

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
  const numberArray = $numberInput.value
    .split(' ')
    .filter((value) => value !== '' && value !== ' ')
    .map(Number);

  createBarArray(numberArray);
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
    newElement.classList.add('sorting-array-element');
    newElement.id = number;
    newElement.dataset.index = index;

    $showSortingNumbers.appendChild(newElement);
  });
};

const animation = async (generator, mergingFunc) => {
  deactivateEvent();

  if (Array.isArray(generator)) {
    const dividedArrayCollection = generator.slice();

    for (const dividedArray of dividedArrayCollection) {
      const firstValueCollection = [];
      const lastValueCollection = [];
      const flattenedArray = dividedArray.flat();

      if (!Array.isArray(dividedArray[0])) {
        firstValueCollection.push(dividedArray[0]);
        lastValueCollection.push(dividedArray.at(-1));
      } else {
        dividedArray.forEach((array) => {
          firstValueCollection.push(array[0]);
          lastValueCollection.push(array.at(-1));
        });
      }

      createBarArray(flattenedArray);

      const $barArrays = document.querySelectorAll('.sorting-array-element');

      Array.from($barArrays).forEach((element) => {
        firstValueCollection.forEach((value) => {
          if (Number(element.id) === value) {
            element.classList.add('first-element-in-array');
          }
        });
        lastValueCollection.forEach((value) => {
          if (Number(element.id) === value) {
            element.classList.add('last-element-in-array');
          }
        });
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    const originalArray = generator.slice();
    const reversedArray = originalArray.toReversed();
    const splittedArray = reversedArray.shift();
    const changeableArray = reversedArray.slice();
    const arrayBeforeEnd = changeableArray[changeableArray.length - 2];

    for (let dividedArray of reversedArray) {
      const firstValueCollection = [];
      const lastValueCollection = [];

      if (!Array.isArray(dividedArray[0])) {
        const left = arrayBeforeEnd.at(0);
        const right = arrayBeforeEnd.at(1);

        dividedArray = mergingFunc(left, right);
      } else {
        for (let i = 0; i < dividedArray.length; i++) {
          const array = dividedArray[i];

          if (array.length === 1) continue;

          const pivot = Math.floor(array.length / 2);
          const left = array.slice(0, pivot);
          const right = array.slice(pivot, array.length);

          dividedArray.splice(i, 1, mergingFunc(left, right));
        }
      }

      if (!Array.isArray(dividedArray[0])) {
        firstValueCollection.push(dividedArray[0]);
        lastValueCollection.push(dividedArray.at(-1));
      } else {
        dividedArray.forEach((array) => {
          firstValueCollection.push(array[0]);
          lastValueCollection.push(array.at(-1));
        });
      }

      const flattenedArray = dividedArray.flat();

      createBarArray(flattenedArray);

      const $barArrays = document.querySelectorAll('.sorting-array-element');

      Array.from($barArrays).forEach((element) => {
        firstValueCollection.forEach((value) => {
          if (Number(element.id) === value) {
            element.classList.add('first-element-in-array');
          }
        });
        lastValueCollection.forEach((value) => {
          if (Number(element.id) === value) {
            element.classList.add('last-element-in-array');
          }
        });
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  } else {
    for (const yieldArray of generator) {
      createBarArray(yieldArray);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
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
