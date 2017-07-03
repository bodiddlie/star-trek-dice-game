export function rollD6() {
  return 1 + Math.floor(Math.random() * 6);
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function shuffle(array) {
  let newArray = clone(array);
  let currentIndex = array.length;
  let temp;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temp = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temp;
  }

  return newArray;
}
