// import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { fetchDataFromApi } from "./utils/api";
import { fetchApiGenresAction } from "./store/reducers/movieReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootDispatch } from "./store/config";

function App(): JSX.Element {
  useEffect(() => {
    genresCall();
  }, []);

  const dispatch = useDispatch<RootDispatch>();

  const genresCall = async () => {
    let promises: any = [];
    let endPoints = ["tv", "movie"];
    let allGenres: any = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item: any) => (allGenres[item.id] = item));
    });
    dispatch(fetchApiGenresAction(allGenres));
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
