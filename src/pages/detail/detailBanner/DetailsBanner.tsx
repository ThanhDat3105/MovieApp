import React, { useEffect, useState } from "react";
import "./detailBanner.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CircleRating from "../../../components/circleRating/CircleRating";
import { fetchDataFromApi } from "../../../utils/api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/config";
import posterFallback from "../../../assets/no-poster.png";
import Genres from "../../../components/genres/Genres";
import PlayBtn from "../../../components/playbtn/PlayBtn";
import { formatDate } from "../../../utils/moment";
import VideoPopup from "../videoPopup/VideoPopup";

interface Props {
  credits: any;
  video: any
}

export default function DetailsBanner(props: Props): JSX.Element {
  const [show, setShow] = useState<Boolean>(false);
  const [videoId, setVideoId] = useState(null);
  const movieReducer = useSelector((state: RootState) => state.movieReducer);
  const { mediaType, id } = useParams();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    fetchDataApi();
  }, []);

  useEffect(() => {
    fetchDataApi();
    setData(data);
    setLoading(true);
  }, [id]);

  const fetchDataApi = async () => {
    await fetchDataFromApi(`/${mediaType}/${id}`).then((data) => {
      setData(data);
      setLoading(false);
    });
  };

  const _genres = data?.genres?.map((ele: any) => ele.id);

  const posterUrl = data?.poster_path
    ? movieReducer?.url.poster + data?.poster_path
    : posterFallback;

  const director = props.credits?.crew?.filter(
    (ele: any) => ele.job === "Director"
  );

  const writer = props.credits?.crew?.filter(
    (ele: any) =>
      ele.job === "Screenplay" || ele.job === "Story" || ele.job === "Writer"
  );

  console.log(props.video)
  return (
    <>
      <div className="detailsBannner">
        {loading ? (
          <div className="detailsBannerSkeleton">
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="backdrop__img">
              <LazyLoadImage
                src={movieReducer.url.backdrop + data?.backdrop_path}
                effect="blur"
              />
            </div>
            <div className="opacity__layer"></div>
            <div className="contentWrapper">
              <div className="content">
                <div className="left">
                  <LazyLoadImage
                    src={posterUrl}
                    effect="blur"
                    style={{ borderRadius: 12 }}
                  />
                </div>
                <div className="right">
                  <div className="title">{data?.title || data?.name}</div>
                  <div className="subtitle">{data?.tagline}</div>
                  <Genres data={_genres} />
                  <div className="row">
                    <CircleRating rating={data?.vote_average?.toFixed(1)} />
                    <div className="playbtn" onClick={() => {
                      setShow(true); setVideoId(props.video.key)
                    }}>
                      <PlayBtn />
                      <div className="text">Watch trailer</div>
                    </div>
                  </div>
                  <div className="overview">
                    <div className="heading">Overview</div>
                    <div className="description">{data?.overview}</div>
                  </div>
                  <div className="info">
                    <div className="infoItem">
                      <span className="text bold">Status: </span>
                      <span className="text">{data?.status}</span>
                    </div>
                    <div className="infoItem">
                      <span className="text bold">Release Date: </span>
                      <span className="text">
                        {formatDate(data?.release_date)}
                      </span>
                    </div>
                    <div className="infoItem">
                      <span className="text bold">Runtime: </span>
                      <span className="text">{data?.runtime}</span>
                    </div>
                  </div>
                  <div className="info">
                    <span className="text bold">Director: </span>
                    <span className="text">
                      {director?.map((ele: any, idx: number) => (
                        <span key={idx}>
                          {ele.name}
                          {director.length - 1 !== idx && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="info">
                    <span className="text bold">Writer:</span>
                    <span className="text">
                      {writer?.map((ele: any, idx: number) => (
                        <span key={idx}>
                          {ele.name}
                          {writer.length - 1 !== idx && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
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
    </>
  );
}
