// @flow
export function rollD6(): number {
  return 1 + Math.floor(Math.random() * 6);
}

export function clone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function shuffle(array: Array<any>): Array<any> {
  let newArray = clone(array);
  let currentIndex: number = array.length;
  let temp: any;
  let randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temp = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temp;
  }

  return newArray;
}
