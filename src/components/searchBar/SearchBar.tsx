import React, { FormEvent } from "react";
import "./SearchBar.css";

interface ISearchBar {
  handleSubmit: Function;
  onChange: Function;
  inputValue: string;
}

const SearchBar: React.FC<ISearchBar> = (props: ISearchBar) => {
  const { handleSubmit, onChange, inputValue } = props;
  return (
    <form
      title="Search Form"
      className="searchForm"
      id="searchForm"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <input
        autoComplete="off"
        title="Search Input"
        placeholder="Input country name"
        type="search"
        id="searchInput"
        value={inputValue}
        onChange={e => onChange(e)}
      />
    </form>
  );
};

export default SearchBar;
