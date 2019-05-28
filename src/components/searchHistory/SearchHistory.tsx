import React, { memo } from "react";
import "./SearchHistory.css";

interface ISearchHistory {
  history: IHistoryObject[];
  clearHistory: Function;
  deleteEntry: Function;
}

export interface IHistoryObject {
  query: string;
  timestamp: string;
}

const SearchHistory: React.FC<ISearchHistory> = (props: ISearchHistory) => {
  const { history, clearHistory, deleteEntry } = props;
  return (
    <div title="Search History" className="searchHistory">
      <span className="header">
        <h2>Search history</h2>
        <button className="clearHistoryButton" onClick={() => clearHistory()}>
          Clear search history
        </button>
      </span>
      <ul>
        {history.map((entry, i) => {
          return (
            <li key={i}>
              <span className="left">{entry.query}</span>
              <span className="right">
                <time>{entry.timestamp}</time>
                <button
                  title="Delete History Entry"
                  className="buttonDelete"
                  onClick={() => deleteEntry(i)}
                >
                  Delete
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(SearchHistory);
