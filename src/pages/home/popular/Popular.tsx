import React, { useEffect, useState } from "react";
import Carousel from "../carousel/Carousel";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { fetchDataFromApi } from "../../../utils/api";

export default function Popular(): JSX.Element {
  const [movie, setMovie] = useState<any>();
  const [endpoint, setEndpoint] = useState<String>("movie");
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    popularList().then(() => {
      setLoading(false)
    });
  }, [endpoint]);

  const popularList = async () => {
    const result = await fetchDataFromApi(`/${endpoint}/popular`);
    setMovie(result.results);
  };

  const onTabChange = (tab: String) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="popular mt-5" style={{ maxWidth: 1160, margin: "auto" }}>
      <div className="d-flex justify-content-between mb-2 align-items-center">
        <h3 className="text-white">What's Popular</h3>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={movie} mediaType={endpoint} loading={loading} />
    </div>
  );
}
