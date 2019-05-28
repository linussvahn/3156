const getCountryName = (selectedID: number, results: string[]) => {
  return results.slice(selectedID - 1, selectedID).toString();
};

export { getCountryName };
