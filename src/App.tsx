import React, { memo } from "react";
import "./App.css";
import SearchComponent from "./components/searchContainer/SearchContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>HM Code Challenge</h1>
        <h2>Linus Svahn</h2>
      </header>
      <SearchComponent />
    </div>
  );
};

export default memo(App);
