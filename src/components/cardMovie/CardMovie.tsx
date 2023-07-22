import React, { useState } from "react";
import posterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import { formatDate } from "../../utils/moment";
import { useSelector } from "react-redux";
import { RootState } from "../../store/config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Genres from "../genres/Genres";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  ele: any;
  mediaType: any;
}

export default function CardMovie(props: Props) {
  const navigate = useNavigate();
  const movieReducer = useSelector((state: RootState) => state.movieReducer);
  const known_for = props.ele.known_for && props.ele.known_for[0];

  const posterUrl = props.ele?.poster_path
    ? movieReducer?.url.poster + props.ele?.poster_path
    : posterFallback;
  return (
    <div
      className="movie__card"
      onClick={() => {
        navigate(
          `/${props.ele.media_type || props.mediaType}/${props.ele.id} `
        );
      }}
    >
      <div className="posterBlock">
        <LazyLoadImage
          src={posterUrl}
          effect="blur"
          style={{ borderRadius: 12 }}
        />
        <CircleRating rating={props.ele?.vote_average?.toFixed(1) || known_for?.vote_average?.toFixed(1)} />
        <Genres
          data={
            props.ele.genre_ids?.slice(0, 2) || props.ele.genres?.slice(0, 2)
          }
        />
      </div>
      <div className="text">
        <span className="title">{props.ele.title || props.ele.name}</span>
        <span className="date">
          {formatDate(props.ele.release_date || known_for?.release_date) ||
            formatDate(props.ele.first_air_date || known_for?.first_air_date)}
        </span>
      </div>
    </div>
  );
}
