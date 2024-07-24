export const hasSymbol = (currency) => {
  // Array of currencies that have symbols
  const symbolCurrencies = ['$', '€', '¥', '£', 'CHF'];
  return symbolCurrencies.includes(currency);
};
