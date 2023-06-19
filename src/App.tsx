// import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
