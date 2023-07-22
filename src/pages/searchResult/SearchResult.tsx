import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import CardMovie from "../../components/cardMovie/CardMovie";

export default function SearchResult(): JSX.Element {
  const [data, setData] = useState<any>();
  const [pageNum, setPageNum] = useState<number>(1);
  const [movieList, setMovieList] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(false);
  const { mediaType } = useParams()
  const { query } = useParams();

  useEffect(() => {
    setPageNum(1);
    window.scrollTo(0, 0);
    fetchInitialData();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [movieList]);

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  const fetchNextPage = async (): Promise<any> => {
    await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (result) => {
        setData(result)
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
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setMovieList(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
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
              {`Search results of '${query}'`}
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
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />} // loading
                >
                  {movieList?.results.map((ele: any, idx: number) => {
                    return (
                      <React.Fragment key={idx}>
                        <CardMovie ele={ele} mediaType={mediaType} />
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
