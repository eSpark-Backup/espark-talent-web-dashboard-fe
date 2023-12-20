export const filterTableRowsWRTTab = (data, filters) => {
  if (filters?.memberStatus === 'All' || !filters?.memberStatus) {
    return data;
  } else {
    return data.filter((member) => {
      return Object.keys(filters).every((key) => {
        // Check if the member has the specified property and the value matches
        return (
          Object.prototype.hasOwnProperty.call(member, key) &&
          member[key] === filters[key]
        );
      });
    });
  }
};
