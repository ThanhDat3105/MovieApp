import React, { useState, useEffect } from "react";
import DetailsBanner from "./detailBanner/DetailsBanner";
import { fetchDataFromApi } from "../../utils/api";
import { useParams } from "react-router-dom";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideosSection";
import Similar from "./similar/Similar";
import Recommend from "./recommend/Recommend";

export default function Detail(): JSX.Element {
  const [credits, setCredits] = useState<any>();
  const [video, setVideo] = useState<any>();
  const [similar, setSimilar] = useState<any>();
  const { mediaType, id } = useParams();
  const [recommend, setRecommend] = useState<any>();

  const [castLoading, setCastLoading] = useState<any>();

  // Cuộn trang lên đầu
  window.scrollTo(0, 0);

  useEffect(() => {
    setCastLoading(true);
    getCredits();
    getVideo();
    getSimilar();
    getRecommend();
  }, [id]);
  const getCredits = async () => {
    await fetchDataFromApi(`/${mediaType}/${id}/credits`).then((data) => {
      setCredits(data);
      setCastLoading(false);
    });
  };

  const getVideo = async () => {
    const data = await fetchDataFromApi(`/${mediaType}/${id}/videos`);
    setVideo(data);
  };

  const getSimilar = async () => {
    const data = await fetchDataFromApi(`/${mediaType}/${id}/similar`);
    setSimilar(data);
  };

  const getRecommend = async () => {
    const data = await fetchDataFromApi(`/${mediaType}/${id}/recommendations`);
    setRecommend(data);
  };

  return (
    <>
      <DetailsBanner video={video?.results?.[0]} credits={credits} />
      <Cast data={credits?.cast} castLoading={castLoading} />
      <VideosSection data={video} castLoading={castLoading} />
      <Similar data={similar} castLoading={castLoading} />
      <Recommend data={recommend} mediaType={mediaType} castLoading={castLoading} />
    </>
  );
}
