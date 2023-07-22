import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../layouts/home/Home";
import HomePage from "../pages/home/HomePage";
import Detail from "../pages/detail/Detail";
import SearchResult from "../pages/searchResult/SearchResult";
import Explore from "../pages/explore/Explore";
import PageNotFound from "../pages/pageNotFound/PageNotFound";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/:mediaType/:id",
          element: <Detail />,
        },
        {
          path: "/search/:query",
          element: <SearchResult />,
        },
        {
          path: "/explore/:mediaType",
          element: <Explore />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  return routing;
}
