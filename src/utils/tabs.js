export const changeTab = (props) => {
  const {
    isSingular,
    event,
    newValue,
    setSearch,
    setCurrentTab,
    setValue,
    setData,
    filterTeamMembers,
    teamMembersData,
    tabs,
  } = props;
  setSearch('');
  const tab = event?.target?.innerText.split(' ');
  tab.pop();
  setCurrentTab(tab.join(' '));
  setValue(newValue);
  if (isSingular) {
    setData(tabs[newValue].data);
  } else {
    if (tab.join(' ') === 'All') {
      setData(filterTeamMembers(teamMembersData, { memberStatus: '' }));
    } else {
      setData(
        filterTeamMembers(teamMembersData, { memberStatus: tab.join(' ') })
      );
    }
  }
};

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};
