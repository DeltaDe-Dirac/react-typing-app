/*Digit or Shif Digit*/
const isDigitOrChar = (keyCode) => keyCode >= 48 && keyCode <= 57;
/*a-Z or Space*/
const isAlphabet = (keyCode) => (keyCode >= 65 && keyCode <= 90) || keyCode === 32;
/*=+ .> ,< -_ /? `~ \| ;: [{ \| ]}*/
const isSpecialChar = (keyCode) => (keyCode >= 186 && keyCode <= 191) || (keyCode >= 219 && keyCode <= 222);

const isAlphanumeric = (keyCode) => isDigitOrChar(keyCode) || isAlphabet(keyCode) || isSpecialChar(keyCode);

const isBackSpace = (keyCode) => keyCode === 8;
const isTab = (keyCode) => keyCode === 9;
const isEnter = (keyCode) => keyCode === 13;
const isShift = (keyCode) => keyCode === 16;
const isCapsLock = (keyCode) => keyCode === 20;
const isAltOrCtr = (keyCode) => keyCode === 18 || keyCode === 17;

export {
  isDigitOrChar,
  isAlphabet,
  isSpecialChar,
  isAlphanumeric,
  isBackSpace,
  isTab,
  isEnter,
  isShift,
  isCapsLock,
  isAltOrCtr,
};
