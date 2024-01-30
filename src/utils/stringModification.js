export const toCamelCase = (inputString) => {
  console.log(inputString);

  const { title } = inputString;
  // Use a regular expression to match non-alphanumeric characters excluding white space
  const regex = /[^a-zA-Z0-9]+(.)/g;
  // Replace the string with camelCase string
  // return title
  //   .toLowerCase()
  //   .replace(regex, (match, chr) => chr.toUpperCase());
  if (title) {
    return title
      .toLowerCase()
      .replace(regex, (match, chr) => chr.toUpperCase());
  } else {
    return inputString
      .toLowerCase()
      .replace(regex, (match, chr) => chr.toUpperCase());
  }
};
