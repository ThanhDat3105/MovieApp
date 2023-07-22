import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/spinner/Spinner";

import CardMovie from "../../components/cardMovie/CardMovie";
import "./explore.scss";
import { useParams } from "react-router-dom";
import Select from "react-select";

export default function Explore(): JSX.Element {
  const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];

  const [pageNum, setPageNum] = useState<number>(1);
  const [movieList, setMovieList] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [genresData, setGenresData] = useState<any>([]);
  const [genresDt, setGenresDt] = useState<any>([]);
  const [id, setId] = useState<any>([]);
  const [sortBy, setSortBy] = useState<any>([]);
  const { mediaType } = useParams();

  useEffect(() => {
    if (id.length > 0) {
      fetchDataMovieByGenres();
      console.log(id)
    }
  }, [id]);

  useEffect(() => {
    if (sortBy.length > 0) {
      fetchDataMovieBySortBy();
    }
  }, [sortBy]);

  useEffect(() => {
    renderGenres();
  }, [genresData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageNum(1);
    fetchGenresData();
    fetchInitialData();
  }, [mediaType]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchInitialData();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [movieList]);

  const fetchNextPage = async (): Promise<any> => {

    await fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`).then(
      (result) => {
        setPageNum((ele: number) => (ele += 1));

        if (movieList) {
          setMovieList({
            ...movieList,
            results: movieList.results.concat(result.results),
          });
        } else {
          setMovieList(result);
        }
        setLoading(false);
      }
    );
  };

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`).then((res) => {
      setMovieList(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchGenresData = async () => {
    await fetchDataFromApi(`/genre/${mediaType}/list`).then((data) => {
      setGenresData(data);
    });
  };



  const handleOnchangeSelectGenres = (selectedItems: any, action: any) => {
    console.log("run")
    console.log({ action, selectedItems })
    setLoading(true);
    if (action.action === "clear") {
      fetchInitialData();
    } else if (action.action === "select-option") {
      const resultIdSelect = selectedItems.map((ele: any) => {
        return ele.id;
      });
      setId(resultIdSelect);
    } else if (action.action === "remove-value") {
      setId(selectedItems)
    } else if (action.action === "remove-value" || selectedItems.length == 0) {
      fetchInitialData();
    }
  };

  const handleOnchangeSelectSortBy = (selectedItems: any, action: any) => {
    if (action.action === "clear") {
      fetchInitialData();
    } else if (action.action === "select-option") {
      setSortBy(selectedItems.value);
      setLoading(true);
    }
  };

  const fetchDataMovieByGenres = async () => {
    await fetchDataFromApi(`/discover/${mediaType}?with_genres=${id}`).then(
      (result) => {
        setMovieList(result);
        setLoading(false);
      }
    );
  };

  const fetchDataMovieBySortBy = async () => {
    await fetchDataFromApi(`/discover/${mediaType}?sort_by=${sortBy}`).then(
      (result) => {
        setMovieList(result);
        setLoading(false);
      }
    );
  };

  const renderGenres = () => {
    return genresData?.genres?.map((ele: any) => {
      setGenresDt((prevGenresDt: any) => [
        ...prevGenresDt,
        { value: ele.name, label: ele.name, id: ele.id },
      ]);
      return ele.name;
    });
  };

  return (
    <>
      {!movieList ? (
        <Spinner initial={true} />
      ) : (
        <div className={`explore`}>
          <div className="pageHeader">
            <div className="pageTitle">
              {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
            </div>
            <div className="filters d-flex">
              {genresDt && (
                <Select
                  closeMenuOnSelect={false}
                  options={genresDt}
                  placeholder="Select Genres"
                  isMulti
                  onChange={handleOnchangeSelectGenres}
                  className="mr-2"
                />
              )}
              <Select
                options={sortbyData}
                placeholder="Sort By"
                isClearable={true}
                onChange={handleOnchangeSelectSortBy}
              />
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div style={{ maxWidth: 1160, margin: "auto" }}>
              {movieList?.results.length > 0 ? (
                <InfiniteScroll
                  className="content"
                  dataLength={movieList?.results.length || []} // chạm mốc độ dài tối đa call api
                  next={fetchNextPage}
                  hasMore={true}
                  loader={<Spinner />} // loading
                >
                  {movieList?.results.map((ele: any, idx: number) => {
                    return (
                      <React.Fragment key={idx}>
                        <CardMovie ele={ele} mediaType={mediaType === "person" ? "movie" : mediaType} />
                      </React.Fragment>
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <span className="resultNotFound">
                  Sorry, Results not found!
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
