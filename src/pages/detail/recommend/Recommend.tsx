import React from "react";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import CardMovie from "../../../components/cardMovie/CardMovie";

interface Props {
  data: any;
  mediaType: any;
  castLoading: boolean;
}

export default function Recommend(props: Props): JSX.Element {
  const title =
    props.mediaType === "tv" ? "Recommend TV Shows" : "Recommend Movies";

  const renderRecommend = () => {
    return props?.data?.results?.map((ele: any) => {
      return (
        <SwiperSlide key={ele.id}>
          <CardMovie ele={ele} mediaType={props.mediaType} />
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="similar">
      {props.castLoading ? (
        ""
      ) : (
        <>
          <h2 className="similarHeading">{title}</h2>
          <Swiper
            spaceBetween={20}
            watchSlidesProgress={true}
            slidesPerView={5}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {renderRecommend()}
          </Swiper>
        </>
      )}
    </div>
  );
}
