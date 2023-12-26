import Flag from 'react-country-flag';

export const FlagIcon = ({ countryCode }) => (
  <Flag
    countryCode={countryCode}
    svg
    style={{ marginRight: '8px', width: '34px', height: '26px' }}
  />
);
export const COUNTRY_OPTIONS = [
  {
    value: 'AF',
    label: (
      <>
        <FlagIcon countryCode="AF" />
        Afghanistan
      </>
    ),
  },
  {
    value: 'AX',
    label: (
      <>
        <FlagIcon countryCode="AX" />
        Aland Islands
      </>
    ),
  },
  {
    value: 'PK',
    label: (
      <>
        <FlagIcon countryCode="PK" />
        Pakistan
      </>
    ),
  },
  {
    value: 'AU',
    label: (
      <>
        <FlagIcon countryCode="AU" />
        Australia
      </>
    ),
  },
  {
    value: 'IN',
    label: (
      <>
        <FlagIcon countryCode="IN" />
        India
      </>
    ),
  },
];
