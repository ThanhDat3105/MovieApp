import React, { useState } from "react";
import "./videoSection.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import PlayBtn from "../../../components/playbtn/PlayBtn";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import VideoPopup from "../videoPopup/VideoPopup";

interface Props {
  data: any;
  castLoading: boolean;
}

export default function VideosSection(props: Props): JSX.Element {
  const [show, setShow] = useState<Boolean>(false);
  const [videoId, setVideoId] = useState(null);

  const renderVideo = () => {
    return props?.data?.results?.map((video: any) => (
      <SwiperSlide key={video.id}>
        <div
          className="videoItem"
          onClick={() => {
            setVideoId(video.key);
            setShow(true);
          }}
        >
          <div className="videoThumbnail">
            <LazyLoadImage
              src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
              effect="blur"
            />
            <PlayBtn />
          </div>
          <div className="videoTitle">{video.name}</div>
        </div>
      </SwiperSlide>
    ));
  };
  return (
    <div className="videosSection">
      {props.castLoading ? (
        ""
      ) : (
        <>
          <h2 className="sectionHeading">Official Videos</h2>
          <div className="videos">
            <Swiper
              spaceBetween={20}
              watchSlidesProgress={true}
              slidesPerView={4}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {renderVideo()}
            </Swiper>
          </div>
          <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
          />
        </>
      )}
    </div>
  );
}
