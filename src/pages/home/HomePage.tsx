import React from "react";
import ItemMovie from "../itemMoive/ItemMovie";
import "./homePage.scss";
export default function HomePage() {
  return (
    <div className="home__page pb-5">
      <div className="banner">
        <div className="banner__img">
          <img src="https://image.tmdb.org/t/p/original/kgATFkG4SDyengNMmCuwmj7igWW.jpg" />
        </div>
        <div className="opacity__banner"></div>
      </div>
      <div className="movie__list">
        <div className="container">
          <div className="hot__list">
            <div className="title">
              <h1>hot</h1>
            </div>
            <div className="movie__item d-flex">
              <ItemMovie />
              <ItemMovie />
              <ItemMovie />
              <ItemMovie />
            </div>
          </div>
          <div className="trending__list mt-5">
            <div className="title">
              <h1>trending</h1>
            </div>
            <div className="movie__item d-flex">
              <ItemMovie />
              <ItemMovie />
              <ItemMovie />
              <ItemMovie />
            </div>
          </div>
          <div className="topRate__list mt-5">
            <div className="title">
              <h1>Top Rate</h1>
            </div>
            <div className="movie__item d-flex">
              <ItemMovie />
              <ItemMovie />
              <ItemMovie />
              <ItemMovie />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
