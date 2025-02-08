export const formatSalary = (value, currency) => {
  if (value >= 1_000_000_000) {
    return (
      (value % 1_000_000_000 === 0
        ? value / 1_000_000_000
        : (value / 1_000_000_000).toFixed(1)) +
      'B ' +
      currency
    );
  } else if (value >= 1_000_000) {
    return (
      (value % 1_000_000 === 0
        ? value / 1_000_000
        : (value / 1_000_000).toFixed(1)) +
      'M ' +
      currency
    );
  } else if (value >= 1_000) {
    return (
      (value % 1_000 === 0 ? value / 1_000 : (value / 1_000).toFixed(1)) +
      'K ' +
      currency
    );
  }
  return value + ' ' + currency;
};
