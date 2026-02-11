//2
function filterRange(arr, a, b) {
  return arr.filter(item => (a <= item && item <= b));
}
let arr = [5, 3, 8, 1];
let filtered = filterRange(arr, 1, 4);
alert( filtered );
alert( arr );

//3
function filterRangeInPlace(arr1, a, b) {
  for (let i = 0; i < arr1.length; i++) {
    let val = arr1[i];
    if (val < a || val > b) {
      arr1.splice(i, 1);
      i--;
    }
  }
}
let arr1 = [5, 3, 8, 1];
filterRangeInPlace(arr1, 1, 4); 
alert( arr1 );

//4
let arr4 = [5, 2, 1, -10, 8];

arr4.sort((a, b) => b - a);

alert( arr4 );

//5
function copySorted(arr5) {
  return arr5.slice().sort();
}

let arr5 = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr5);

alert( sorted );
alert( arr5 );