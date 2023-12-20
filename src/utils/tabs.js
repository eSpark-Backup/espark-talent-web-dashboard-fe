export const changeTab = ({
  isSingular,
  event,
  newValue,
  setSearch,
  setCurrentTab,
  setValue,
  setData,
  filterTableRowsWRTTab,
  teamMembersData,
  tabs,
}) => {
  setSearch('');

  const tab = event?.target?.innerText.split(' ').slice(0, -1).join(' ');
  setCurrentTab(tab);

  setValue(newValue);

  if (isSingular) {
    setData(tabs[newValue].data);
  } else {
    const memberStatus = tab === 'All' ? '' : tab;
    setData(filterTableRowsWRTTab(teamMembersData, { memberStatus }));
  }
};

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};
