import "./styles/CitiesList.css";
import { City } from "../models/city";
import { Loader } from "./Loader";
import { useEffect, useState, useContext } from "react";
import { CityContext } from "../context/CityContext";
import { FromAndLimitContext } from "../context/FromAndLimitContext";
import { getData } from "../utils";

export const CitiesList = () => {
  const params = new URLSearchParams(window.location.search);

  const [selected, setSelected] = useState<string>(params.get("city") || "all");
  const [loading, setLoading] = useState<boolean>(false);

  const { fromAndLimit, setFromAndLimit } = useContext(FromAndLimitContext);
  const { cities, setCities } = useContext(CityContext);

  const getCities = async () => {
    setLoading(true);
    let { from, limit, max } = fromAndLimit;

    let countryParam = params.get("country");

    limit = limit < max ? limit : max;

    let country = countryParam ? `?country=${countryParam}` : "";
    let city = params.get("city") ? `&city=${params.get("city")}` : "";
    let querylimit = `&limit=${limit}`;
    let _from = `&from=${from}`;
    let queryString =
      countryParam === "all"
        ? `/cities?${_from}${querylimit}`
        : `/cities/${country}${city}${_from}${querylimit}`;

    const newCities = countryParam && (await getData(queryString));

    if (cities === null) {
      setCities(newCities);
    } else {
      //if (limit <= max) {
      setCities([...cities, ...newCities]);
      //}
    }

    setLoading(false);
  };

  useEffect(() => {
    getCities();
  }, [fromAndLimit]);

  const loadMoreCities = () => {
    let { limit, max } = fromAndLimit;
    if (limit < max) {
      setFromAndLimit({ from: limit + 1, limit: limit + 50, max: max });
    }
  };
  const handleScroll = (e: any) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

    if (clientHeight + scrollTop === scrollHeight) {
      loadMoreCities();
    }
  };

  const handleChangeCity = (city: City) => {
    params.set("city", city.name);
    let limit = params.get("limit");
    window.history.pushState(
      {},
      "",
      `?country=${params.get("country")}&city=${city.name}${
        limit ? `&limit=${limit}` : ""
      }`
    );
    setSelected(city.name);
  };

  return (
    <div
      onScroll={handleScroll}
      id="cities-table-wrapper"
      className={loading || cities === null ? "loading" : ""}
    >
      {cities === null ? (
        <h2>Select a country to display its cities</h2>
      ) : loading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Sub Country</th>
              <th>Geoname Id</th>
            </tr>
          </thead>
          <tbody className={loading || cities === null ? "loading" : ""}>
            {cities
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((city, index: number) => (
                <tr
                  data-testid={`city-row-${index}`}
                  className={selected === city.name ? "selected" : ""}
                  onClick={() => handleChangeCity(city)}
                  key={index}
                >
                  <td>{city.name}</td>
                  <td>{city.country}</td>
                  <td>{city.subcountry}</td>
                  <td role="link">
                    <a
                      href={`https://www.geonames.org/${city.geonameid}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {city.geonameid}
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
