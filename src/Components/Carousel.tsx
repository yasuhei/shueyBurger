import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/virtual";
import { imagens } from "../utils/Images";
// import image7 from "../images/image7.jpg";

export function CarouselFood() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {imagens.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index}>
            <img src={slideContent} alt="" className="rounded-md" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
