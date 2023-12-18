import React, { useState } from 'react';
import Select from 'react-select';

const countryOptions = [
  { value: 'PS', label: 'Pakistan', images: '/images/flags/pakistan.png' },
  { value: 'PL', label: 'Palestine', images: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PS.svg'},
  { value: 'IN', label:'India', images: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg'},
  // Add more countries as needed
];

const CountryDropdown = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <Select
      value={selectedCountry}
      onChange={handleChange}
      options={countryOptions}
      isSearchable
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue,
      }}
    />
  );
};

// Custom Option component to display flag along with country name
const CustomOption = ({ innerProps, label, data }) => (
  <div {...innerProps}>
    <img src={data.image} alt={label} style={{ width: '24px', marginRight: '8px' }} />
    <span style={{ marginLeft: '8px' }}>{label}</span>
  </div>
);

// Custom SingleValue component to display flag along with selected country name
const CustomSingleValue = ({ innerProps, label, data }) => (
  <div {...innerProps}>
    {data.images}
    <span style={{ marginLeft: '8px' }}>{label}</span>
  </div>
);

export default CountryDropdown;