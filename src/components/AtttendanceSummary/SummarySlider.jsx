import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import StatusBox from './StatusBox';
import { Summary_Slider_Breakpoints } from '@/src/constants/employeeDashboard';
import { Box } from '@mui/material';

export default function SummarySlider({ Summary_Boxes,isEmployee }) {
  return (
  <>
  {isEmployee ? (
    <Swiper
      breakpoints={Summary_Slider_Breakpoints}
      freeMode={true}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
    >
      {Summary_Boxes?.map((item, index) => (
        <SwiperSlide key={index}>
          <StatusBox
            title={item?.title}
            count={item?.count}
            horizotalLineColor={item?.horizotalLineColor}
            backgroundColor={item?.backgroundColor}
            images={item?.image}
            isEmployee={isEmployee}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
          <>
            <Box sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap:"10px"
            }}>
               {Summary_Boxes?.map((item, index) => (
        <StatusBox
          key={index}
          title={item?.title}
          count={item?.count}
          horizotalLineColor={item?.horizotalLineColor}
          backgroundColor={item?.backgroundColor}
          images={item?.image}
          isEmployee={isEmployee}
        />
      ))}
            </Box>
     
    </>
  )}
</>

  );
}
