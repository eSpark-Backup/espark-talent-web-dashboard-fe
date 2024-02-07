export const fetchCountriesList = async () => {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags'
  );
  const data = await response.json();
  return data;
};
