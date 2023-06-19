import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootDispatch, RootState } from "../../store/config";
import { movieActions } from "../../store/reducers/movieReducer";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function Home() {
  const dispatch = useDispatch<RootDispatch>();
  const movieState = useSelector((state: RootState) => state.movieReducer);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
