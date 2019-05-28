import React, { useState, useEffect } from "react";
import SearchBar from "../searchBar/SearchBar";
import SearchResults from "../searchResults/SearchResults";
import searchCountry from "../../api/searchCountry";
import SearchHistory, { IHistoryObject } from "../searchHistory/SearchHistory";
import "./SearchContainer.css";
import { getTimestamp } from "../../utils/getTimestamp";
import { getCountryName } from "./searchContainerHelpers/getCountryName";
import Spinner from "../spinner/Spinner";

const SearchContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>();
  const [history, setHistory] = useState<IHistoryObject[]>([]);

  // Search for country on searchString with timeout
  useEffect(() => {
    let searchTimeout: any;
    if (searchString.length >= 2) {
      searchTimeout = setTimeout(() => {
        setIsLoading(true);
        searchCountry(searchString).then(data => {
          setSearchResults(data);
          setIsLoading(false);
        });
      }, 250);
      return () => clearTimeout(searchTimeout);
    } else {
      clearSearchResults();
      setIsLoading(false);
    }
  }, [searchString]);

  const keyPresshandler = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 38:
        event.preventDefault();
        arrowUp();
        break;
      case 40:
        event.preventDefault();
        arrowDown();
        break;
    }
  };

  // Add event listener for keydown
  useEffect(() => {
    window.addEventListener("keydown", keyPresshandler);
    return () => {
      window.removeEventListener("keydown", keyPresshandler);
    };
  }, [selected]);

  // Decrement selected
  const arrowUp = () => {
    if (selected && searchResults) {
      selected > 1 && setSelected(selected - 1);
    }
  };

  // Increment selected
  const arrowDown = () => {
    if (selected === null) {
      setSelected(1);
    }
    if (selected && searchResults) {
      selected < searchResults.length && setSelected(selected + 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchString(value);
  };

  const saveSearchToHistory = (searchItem: string) => {
    if (searchItem.length) {
      // If search item is provided, save it.
      const newEntry = {
        query: searchItem,
        timestamp: getTimestamp()
      };
      setHistory([...history, newEntry]);
    } else if (selected && searchResults) {
      // Save selected result
      const newEntry = {
        query: getCountryName(selected, searchResults),
        timestamp: getTimestamp()
      };
      setHistory([...history, newEntry]);
    } else if (searchString.length >= 2) {
      // If user just submits without selecting a suggestion
      const newEntry = { query: searchString, timestamp: getTimestamp() };
      setHistory([...history, newEntry]);
      setSearchString("");
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
  };

  const clearSearchHistory = () => {
    setHistory([]);
  };

  const spliceHistory = async (id: number) => {
    const newHistory = history;
    newHistory.splice(id, 1);
    return newHistory;
  };

  const deleteSearchEntry = (id: number) => {
    spliceHistory(id).then(updatedHistory => setHistory([...updatedHistory]));
  };

  // Reset search input and selected id whenever something is saved
  useEffect(() => {
    setSearchString("");
    setSelected(null);
  }, [history]);

  // Reset selected if searchString changes
  useEffect(() => {
    setSelected(null);
  }, [searchString]);

  return (
    <section className="searchContainer" title="Search">
      <h1>Search for a country</h1>
      <SearchBar
        handleSubmit={saveSearchToHistory}
        onChange={handleInputChange}
        inputValue={searchString}
      />
      {isLoading && <Spinner />}
      {searchResults && searchResults.length > 0 && (
        <SearchResults
          selectedResult={selected}
          results={searchResults}
          searchString={searchString}
          saveSearchToHistory={saveSearchToHistory}
        />
      )}
      {history.length > 0 && (
        <SearchHistory
          clearHistory={clearSearchHistory}
          history={history}
          deleteEntry={deleteSearchEntry}
        />
      )}
    </section>
  );
};

export default SearchContainer;
