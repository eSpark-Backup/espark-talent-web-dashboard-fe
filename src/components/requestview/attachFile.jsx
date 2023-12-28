import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import { useRef } from 'react';

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
              width={20}
              height={20}
              alt="attach"
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
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
