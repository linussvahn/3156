import React, { memo } from "react";
import "./SearchResults.css";
import { boldify } from "../../utils/boldify";

export interface ISearchResults {
  results: string[];
  selectedResult: number | null;
  searchString: string;
  saveSearchToHistory: Function;
}

export interface ISearchResult {
  id: number;
  name: string;
}

const getClassNameIfSelected = (
  currentIndex: number,
  selectedIndex: number | null
) => {
  if (currentIndex + 1 === selectedIndex) {
    return "selected";
  } else {
    return "";
  }
};

const SearchResults: React.FC<ISearchResults> = (props: ISearchResults) => {
  const { results, selectedResult, searchString, saveSearchToHistory } = props;
  return (
    <ul id="searchResults" title="Search Results" className="searchResults">
      {results.map((result, i) => {
        return (
          <li
            key={i}
            id={`result-${(i + 1).toString()}`}
            className={`listItem ${getClassNameIfSelected(i, selectedResult)}`}
            dangerouslySetInnerHTML={boldify(result, searchString)}
            onClick={() => saveSearchToHistory(result)}
          />
        );
      })}
    </ul>
  );
};

export default memo(SearchResults);
