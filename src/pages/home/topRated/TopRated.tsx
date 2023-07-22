import React, { useEffect, useState } from "react";
import Carousel from "../carousel/Carousel";
import { fetchDataFromApi } from "../../../utils/api";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/config";

export default function TopRated(): JSX.Element {
  const movieReducer = useSelector((state: RootState) => state.movieReducer);

  const [endpoint, setEndpoint] = useState<String>("movie");
  const [loading, setLoading] = useState<Boolean>(movieReducer.loading);
  const [movie, setMovie] = useState<any>();

  useEffect(() => {
    setLoading(true);
    topRated().then(() => {
      setLoading(false)
    });
  }, [endpoint]);

  const topRated = async () => {
    const result = await fetchDataFromApi(`/${endpoint}/top_rated`);
    setLoading(false);
    setMovie(result.results);
  };

  const onTabChange = (tab: String) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="popular mt-5" style={{ maxWidth: 1160, margin: "auto" }}>
      <div className="d-flex justify-content-between mb-2 align-items-center">
        <h3 className="text-white">Top Rated</h3>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={movie} mediaType={endpoint} loading={loading} />
    </div>
  );
}
