export const arrayMean = array => array.reduce((a, b) => a + b) / array.length;

export const onlyUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  }
  