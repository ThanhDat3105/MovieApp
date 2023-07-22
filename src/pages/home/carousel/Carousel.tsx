import React from "react";
import "./carousel.scss";
import "react-lazy-load-image-component/src/effects/blur.css";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import CardMovie from "../../../components/cardMovie/CardMovie";

interface Props {
  data: any;
  loading?: Boolean;
  mediaType: String;
}

export default function Carousel(props: Props): JSX.Element {
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  const renderMovieTrending = () => {
    return props.data?.map((ele: any) => {
      return (
        <SwiperSlide key={ele.id}>
          <CardMovie ele={ele} mediaType={props.mediaType} />
        </SwiperSlide>
      );
    });
  };

  return (
    <>
      <Swiper
        spaceBetween={20}
        watchSlidesProgress={true}
        slidesPerView={5}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {props.loading ? (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        ) : (
          renderMovieTrending()
        )}
      </Swiper>
    </>
  );
}
