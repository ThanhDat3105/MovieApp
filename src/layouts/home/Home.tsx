import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootDispatch, RootState } from "../../store/config";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { fetchApiConfigurationAction } from "../../store/reducers/movieReducer";
import PlayBtn from "../../components/playbtn/PlayBtn";

export default function Home() {
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(fetchApiConfigurationAction());
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
