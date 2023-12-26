import React from 'react';
import Image from 'next/image';

const DropdownRightArrow = (props) => {
  return (
    <Image
      {...props}
      src="/images/hiring/rightarrow.svg"
      width={30}
      height={30}
      alt="rightarrow"
    />
  );
};
export default DropdownRightArrow;
