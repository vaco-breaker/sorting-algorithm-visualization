const $sortOptionBox = document.querySelector('.sort-option-box');
const $sortOptions = $sortOptionBox.querySelectorAll('li');
const $numberInput = document.querySelector('#numberInput');
const $errorMessage = document.querySelector('#errorMessage');
const $submitButton = document.querySelector('#submitButton');

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
      console.log(targetArray);
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
      console.log(targetArray);
      break;
    default:
      break;
  }
};

const pickSortingAlgorithmCallback = () => {
  const inputValue = $numberInput.value;
  const numberArray = inputValue
    .split(' ')
    .filter((value) => value !== '' && value !== ' ');

  pickSortingAlgorithm(selectedSortOption, numberArray);
};

$numberInput.addEventListener('input', changeNumberInput);
$sortOptionBox.addEventListener('click', clickSortOptions);
$submitButton.addEventListener('click', pickSortingAlgorithmCallback);
