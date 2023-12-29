import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import StatusBox from './StatusBox';
import { Summary_Slider_Breakpoints } from '@/src/constants/employeeDashboard';

export default function SummarySlider({ Summary_Boxes }) {
  return (
    <>
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
