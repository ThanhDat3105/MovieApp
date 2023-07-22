import React from "react";
import ReactPlayer from "react-player";
import "./videoPopup.scss";
import { BsArrowLeft } from "react-icons/bs";
interface Props {
  show: Boolean;
  setShow: React.Dispatch<boolean>;
  videoId: any;
  setVideoId: any;
}

export default function VideoPopup(props: Props): JSX.Element {
  const hidePopup = () => {
    props.setShow(false);
    props.setVideoId(null);
  };
  return (
    <div className={`videoPopup ${props.show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <button className="btn">
          <BsArrowLeft className="button__close" onClick={hidePopup} />
        </button>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${props.videoId}`}
          controls
          width="100%"
          height="100%"
        // playing={true}
        />
      </div>
    </div>
  );
}
