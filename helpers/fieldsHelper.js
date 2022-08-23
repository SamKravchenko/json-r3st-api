module.exports = (fields = {}, modifyFields = {}) => {
  const fieldsArray = Object.entries(fields);
  if (!fieldsArray.length) return fields;
  return fieldsArray.reduce((prev, [key, value]) => {
    if (value === '' || value === undefined) {
      return prev;
    }
    if (modifyFields?.[key]) {
      const result = modifyFields[key](key, value);
      if (!Array.isArray(result)) return prev;
      const [newKey = key, newValue = new RegExp(value, 'i')] = result;
      return {
        ...prev,
        [newKey]: newValue,
      };
    }
    return {
      ...prev,
      [key]: new RegExp(value, 'i'),
    };
  }, {});
};
