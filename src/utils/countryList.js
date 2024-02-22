export const fetchCountriesList = async () => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    const formattedCountries = data
      .map((country) => ({
        title: country?.name?.common,
        flag: country?.flags?.svg,
      }))
      .sort((countryA, countryB) => (countryA.title < countryB.title ? -1 : 1));
    return formattedCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
