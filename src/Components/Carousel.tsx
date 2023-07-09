import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/virtual";

import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";
import image6 from "../images/image6.jpg";
import image8 from "../images/image8.jpg";
// import image7 from "../images/image7.jpg";

export function CarouselFood() {
  const imagens = [image1, image2, image6, image3, image4, image5, image8];

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
