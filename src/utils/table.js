export const filterTableRowsWRTTab = (data, filters) => {
  if (!filters || Object.keys(filters).length === 0) {
    return data;
  } else {
    return data?.filter((member) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        console.log({ filterValue });

        // Check if the member has the specified property
        if (Object.prototype.hasOwnProperty.call(member, key)) {
          // If filter value is an empty string, do not filter based on this key
          if (filterValue === '') {
            return true;
          }
          // Check if the value matches
          return member[key] === filterValue;
        } else {
          // If the member does not have the specified property, do not filter based on this key
          return true;
        }
      });
    });
  }
};
