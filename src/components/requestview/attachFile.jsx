import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import { useRef } from 'react';
import styles from '@/src/components/requestview/image.module.css';

const AttachDoc = () => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
  };

  return (
    <TextField
      sx={{
        width: '600px',
        borderRadius: '5px',
        border: '1px solid #E4E4E4',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Image
              src="/images/leave-request/attach-icon.svg"
              // width={0}
              // height={0}
              className={styles.image}
              width={30} // Default width value in pixels
              height={30} // Default height value in pixels
              // sx={{
              //   width: {
              //     xs: '40px',
              //     md: '30px',
              //   },
              //   height: {
              //     xs: '40px',
              //     md: '30px,'
              //   },
              // }}
              alt="attach"
              onClick={handleImageClick}
              // sx={{
              //   width: {
              //     xs: 20,
              //     md: 30,
              //   },
              //   height: {
              //     xs: 20,
              //     md: 30,
              //   }
              // }}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default AttachDoc;
