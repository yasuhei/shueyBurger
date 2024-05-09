import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/virtual";
import { imagens } from "../utils/Images";
import { useMediaQuery } from "@mui/material";
// import image7 from "../images/image7.jpg";

export function CarouselFood() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Swiper
        slidesPerView={isMobile ? 1.5 : 3}
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
