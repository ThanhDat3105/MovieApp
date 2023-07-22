import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/config";
import avatar from "../../../assets/avatar.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./cast.scss";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useParams } from "react-router-dom";
interface Props {
  data: any;
  castLoading: boolean;
}

export default function Cast(props: Props): JSX.Element {
  const movieReducer = useSelector((state: RootState) => state.movieReducer);
  const renderCast = () => {
    return props.data?.map((item: any) => {
      const imgUrl = item.profile_path
        ? movieReducer?.url.profile + item.profile_path
        : avatar;
      return (
        <SwiperSlide key={item.id}>
          <div className="listItem">
            <div className="profileImg">
              <LazyLoadImage src={imgUrl} effect="blur" />
            </div>
            <div className="name">{item.name}</div>
            <div className="character">{item.character}</div>
          </div>
        </SwiperSlide>
      );
    });
  };

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="castSection">
      {props.castLoading ? (
        <div className="castSkeleton">
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
        </div>
      ) : (
        <div className="sectionHeading">
          <h2>Top Cast</h2>
          <div className="listItems">
            <Swiper
              spaceBetween={20}
              watchSlidesProgress={true}
              slidesPerView={6}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {renderCast()}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
