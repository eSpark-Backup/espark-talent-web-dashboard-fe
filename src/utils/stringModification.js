export const toCamelCase = (inputString) => {
  // Use a regular expression to match non-alphanumeric characters excluding white space
  const regex = /[^a-zA-Z0-9]+(.)/g;
  // Replace the string with camelCase string
  return inputString
    .toLowerCase()
    .replace(regex, (match, chr) => chr.toUpperCase());
};
