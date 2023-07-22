import React, { useState, useEffect } from "react";
import Carousel from "../carousel/Carousel";
import { fetchDataFromApi } from "../../../utils/api";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/config";

export default function Trending(): JSX.Element {
  const movieReducer = useSelector((state: RootState) => state.movieReducer);

  const [movie, setMovie] = useState<any>();
  const [endpoint, setEndpoint] = useState<String>("day");
  const [loading, setLoading] = useState<Boolean>(movieReducer.loading);

  useEffect(() => {
    setLoading(true);
    trendingList().then(() => {
      setLoading(false);
    });
  }, [endpoint]);

  const trendingList = async () => {
    const result = await fetchDataFromApi(`/trending/movie/${endpoint}`);
    setMovie(result.results);
    localStorage.setItem("movieList", JSON.stringify(result.results));
  };

  const onTabChange = (tab: String) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="trending" style={{ maxWidth: 1160, margin: "auto" }}>
      <div className="d-flex justify-content-between mb-2 align-items-center">
        <h3 className="text-white">Trending</h3>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={movie} mediaType={endpoint} loading={loading} />
    </div>
  );
}
