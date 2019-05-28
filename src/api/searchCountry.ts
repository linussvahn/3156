import { Country } from "./searchCountry.interface";

const API_PROTOCOL = "https";
const API_URI = "restcountries.eu/rest";
const API_VERSION = "v2";
const API_ENDPOINT = "name";

// https://restcountries.eu/rest/v2/name/{name}
const searchCountry = async (countryName: string) => {
  const response = await fetch(
    `${API_PROTOCOL}://${API_URI}/${API_VERSION}/${API_ENDPOINT}/${countryName}`,
    { method: "GET" }
  );
  if (response.status === 200) {
    const data = await response.json();
    return data.map((country: Country) => country.name);
  } else if (response.status === 404) {
    return ["No results"];
  } else {
    return console.error(response.statusText);
  }
};

export default searchCountry;
