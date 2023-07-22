import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/config";
import { fetchDataFromApi } from "../../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

export default function Banner(): JSX.Element {
  const navigate = useNavigate()
  const [background, setBackground] = useState<any>();
  const [query, setQuery] = useState<String>("")
  const [data, setData] = useState<any>();
  const movieReducer = useSelector((state: RootState) => state.movieReducer);

  useEffect(() => {
    getUpcoming();
  }, []);

  useEffect(() => {
    const bg =
      movieReducer?.url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

    setBackground(bg);
  }, [data]);

  const getUpcoming = async () => {
    await fetchDataFromApi(`/movie/upcoming`).then((data) => {
      setData(data);
    });
  };

  const searchQueryHandler = (event: any) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="banner">
      <div className="banner__img">
        {data ? (
          <LazyLoadImage
            src={background}
            effect="blur"
            style={{ display: "initial" }}
          />
        ) : (
          ""
        )}
      </div>
      <div className="heroBannerContent">
        <span className="title">Welcome.</span>
        <span className="subTitle">
          Millions of movies, TV shows and people to discover.
          Explore now.
        </span>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search for a movie or tv show...."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
          <button>Search</button>
        </div>
      </div>
      <div className="opacity__banner"></div>

      <div className="toRight"></div>
    </div>
  );
}
