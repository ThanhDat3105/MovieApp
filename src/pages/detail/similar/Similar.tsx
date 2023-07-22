import React from "react";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import CardMovie from "../../../components/cardMovie/CardMovie";
import { useParams } from "react-router-dom";
import "./similar.scss";

interface Props {
  data: any;
  castLoading: boolean;
}
export default function Similar(props: Props): JSX.Element {
  const { mediaType, id } = useParams();

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  const renderSimilar = () => {
    return props?.data?.results?.map((ele: any) => {
      return (
        <SwiperSlide key={ele.id}>
          <CardMovie ele={ele} mediaType={mediaType} />
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
            {renderSimilar()}
          </Swiper>
        </>
      )}
    </div>
  );
}
