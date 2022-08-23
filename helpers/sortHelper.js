module.exports = (value) => {
  const validValues = ['1', '-1', 'asc', 'desc', 'ascending', 'descending'];
  const defaultValue = validValues[0];
  if (!validValues.includes(value)) {
    return defaultValue;
  }
  return value;
};
