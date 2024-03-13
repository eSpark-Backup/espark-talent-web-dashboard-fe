'use client';

// export const filterDataByKeyword = (data, keyword, setData) => {
//   if (keyword === '') {
//     setData(data);
//     return data;
//   } else {
//     const tempData = data.filter((employee) => {
//       const lowerKeyword = keyword.toLowerCase();
//       return Object.values(employee).some(
//         (value) =>
//           typeof value === 'string' &&
//           value.toLowerCase().includes(lowerKeyword)
//       );
//     });
//     setData(tempData);
//     return tempData
//   }
// };

export const filterDataByKeyword = (data, keyword, setData) => {
  if (!data || data.length === 0) {
    setData?.([]);
    return [];
  }

  const filteredData = data.filter((item) => {
    if (typeof item === 'string') {
      // Handle array of strings
      const lowerKeyword = keyword.toLowerCase();
      return item.toLowerCase().includes(lowerKeyword);
    } else if (typeof item === 'object') {
      // Handle array of objects
      return Object.values(item).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    return false;
  });

  setData?.(filteredData);
  return filteredData;
};
