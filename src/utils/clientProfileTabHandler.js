export const clientProfileTabsHandler = (
  clientProfileTabs,
  label,
  nestedLabel,
  setCurrentTab,
  dataType,
  processColumns,
  column,
  setCurrentTabTable,
  mainVal,
  nestedVal
) => {
  const colData = clientProfileTabs.find((tab) => tab.label === label);

  setCurrentTab((ps) => {
    return {
      ...ps,
      label: label,
      val: mainVal,
      nested: {
        label: nestedLabel,
        data: dataType,
        column: processColumns(column),
        val: nestedVal,
      },
    };
  });

  setCurrentTabTable((ps) => ({
    ...ps,
    data: dataType,
    column: colData?.nestedTabs?.[0]?.column,
  }));
};
