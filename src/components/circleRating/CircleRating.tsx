import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "./circleRating.scss";

interface Props {
  rating: any;
}

export default function CircleRating(props: Props) {
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={props.rating}
        maxValue={10}
        text={props.rating}
        styles={buildStyles({
          pathColor:
            props.rating < 5 ? "red" : props.rating < 7 ? "orange" : "green",
            
        })}
      />
    </div>
  );
}
