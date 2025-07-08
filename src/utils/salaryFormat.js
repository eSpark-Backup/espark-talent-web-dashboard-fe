const formatSalary = (value, currency) => {
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

const getSelectedCountry = (countryName, countriesList) => {
  return (
    countriesList?.find((c) => c?.title === countryName) || {
      title: '',
      flag: '',
    }
  );
};

const getSalaryAmount = (value) => {
  if (typeof value !== 'string') return 0;

  // Sirf number aur K, M, B extract karne ke liye regex
  const match = value?.match(/([\d.]+)\s*([KMB]?)/i);
  if (!match) return 0;

  const amount = parseFloat(match[1]);
  const multiplier = { K: 1e3, M: 1e6, B: 1e9 };

  return amount * (multiplier[match[2]?.toUpperCase()] || 1);
};

export { getSalaryAmount, getSelectedCountry, formatSalary };
