const $sortOptionBox = document.querySelector(".sort-option-box");
const $sortOptions = $sortOptionBox.querySelectorAll("li");
const $numberInput = document.querySelector("#numberInput");
const $errorMessage = document.querySelector("#errorMessage");

const changeNumberInput = (e) => {
  const regExp = /[0-9 ]/g;

  if (!regExp.test(e.target.value)) {
    $errorMessage.textContent = "숫자와 띄어쓰기만 입력 가능합니다!";
  } else {
    $errorMessage.textContent = "";
  }

  e.target.value = e.target.value.replace(/[^0-9 ]/g, '');
}

const clickSortOptions = (e) => {
  $sortOptions.forEach(el => {
    if (el.textContent === e.target.textContent) {
      el.classList.add("selected");
    } else if (e.target.tagName === "LI") {
      el.classList.remove("selected");
    }
  })

  switch (e.target.id) {
    case "bubbleSort":
      console.log("Bubble Sort Clicked!");
      break;
    case "insertionSort":
      console.log("Insertion Sort Clicked!");
      break;
    case "mergeSort":
      console.log("Merge Sort Clicked!");
      break;
    case "selectionSort":
      console.log("Selection Sort Clicked!");
      break;
    default:
      break;
  }
}

$numberInput.addEventListener("input", changeNumberInput);
$sortOptionBox.addEventListener("click", clickSortOptions);