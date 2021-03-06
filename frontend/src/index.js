import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.scss";
import Homepage from "./Homepage";
import ReviewPage from "./Reviews";
import Submit from "./Submit";
import Header from "./shared/Header";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/submit" element={ <Submit /> } />
        <Route path="/review" element={ <ReviewPage /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
