'use client';
export const toCamelCase = (inputString) => {
  return inputString
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

export const filterDataByKeyword = (data, keyword, setData) => {
  if (keyword === '') {
    setData(data);
    return data;
  } else {
    const tempData = data.filter((employee) => {
      const lowerKeyword = keyword.toLowerCase();
      return Object.values(employee).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerKeyword)
      );
    });
    setData(tempData);
  }
};
