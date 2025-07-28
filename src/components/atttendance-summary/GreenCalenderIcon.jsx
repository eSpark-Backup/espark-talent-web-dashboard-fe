import Image from 'next/image';

const GreenCalenderIcon = ({ props, open }) => {
  return (
    <Image
      {...props}
      src="/images/attendance/greencalendar.svg"
      width={25}
      height={25}
      pr={'10px'}
      alt="calender"
      onClick={open}
    />
  );
};
export default GreenCalenderIcon;
