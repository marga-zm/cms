export const compareStrings = (val1, val2, keyword) => {
  let isValid = false;
  if (val1 === val2) {
    const message = "";
    isValid = true;
    return { message, isValid };
  } else {
    const message = `Los valores ingresados de ${keyword} no son iguales`;
    return { message, isValid };
  }
};

export const capitalizeWord = (word = "") => {
  return word
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};
