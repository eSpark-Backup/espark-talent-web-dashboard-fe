import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import StatusBox from './StatusBox';
import { Summary_Slider_Breakpoints } from '@/src/constants/employeeDashboard';

export default function SummarySlider({ summaryBoxes, hrView }) {
  return (
    <>
      <Swiper
        breakpoints={Summary_Slider_Breakpoints}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {summaryBoxes?.map((item, index) => (
          <SwiperSlide key={index}>
            <StatusBox
              title={item?.title}
              count={item?.count}
              horizotalLineColor={item?.horizotalLineColor}
              backgroundColor={item?.backgroundColor}
              image={item?.image}
              hrView={hrView}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
