import React, { useEffect } from "react";
import "./homePage.scss";
import Banner from "./banner/Banner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
export default function HomePage(): JSX.Element {
  return (
    <div className="home__page" style={{ paddingBottom: 80 }}>
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
}
