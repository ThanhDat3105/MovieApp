import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/config";
import "./genres.scss";

interface Props {
  data: any;
}

export default function Genres(props: Props): JSX.Element {
  const { genRes } = useSelector((state: RootState) => state.movieReducer);

  return (
    <div className="genres">
      {props.data?.map((g: any) => {
        if (!genRes[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genRes[g]?.name}
          </div>
        );
      })}
    </div>
  );
}
