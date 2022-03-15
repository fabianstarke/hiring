import { useState, useEffect, useContext } from "react"
import "./styles/Sidebar.css";
import { Country } from "../models/country";
import { Loader } from "./Loader";
import { getData } from "../utils";
import { CityContext } from "../context/CityContext";
import { FromAndLimitContext } from "../context/FromAndLimitContext";

export const Sidebar = () => {
  const params = new URLSearchParams(window.location.search);
  const countryParam = params.get("country");
  const [countries, setCountries] = useState<Country[] | null>(null);
  const { setCities} = useContext(CityContext);
  const { setFromAndLimit } = useContext(FromAndLimitContext);

  const [loading, setLoading] = useState<boolean>(true);

   const getCountries = async () => {
    setLoading(true);
    const countries = await getData("/countries");
    setCountries(countries);
    if(countryParam){
      const country = countries.filter((country: { name: string | null; }) => country.name === countryParam)
      setFromAndLimit({from: 0, limit: 50, max: country[0].count})
    }
    setLoading(false);
  };

  useEffect(() => {
    getCountries();
  }, []);


  const handleChangeCountry = (country: Country | null) => {
    setCities([]);
    if (country) {
      params.set("country", country.name);
      window.history.pushState({}, "", `?country=${country.name}`);

      if (country.count) {
        if (country.count <= 50) {
          setFromAndLimit({
            from: 0,
            limit: country.count,
            max: country.count,
          });
        } else {
          setFromAndLimit({ from: 0, limit: 50, max: country.count <= 500 ? country.count : 500 });
        }
      }
    } else {
      setCities([]);
      params.delete("country");
      window.history.pushState({}, "", `?country=all`);
      setFromAndLimit({ from: 0, limit: 50, max: 500 });
    }
  };

  
  return (
    <div data-testid="sidebar" id="sidebar" className={loading || countries === null? "loading" : ""}>
      {countries === null ? <h2>No countries</h2> : loading ?  (
        <Loader />
      ): (
        <table>
        <thead>
          <tr><th>Countries List</th></tr>
        </thead>
        <tbody>
          <tr className={countryParam === "all" ? "selected" : ""} onClick={() => handleChangeCountry(null)}><td>All cities</td></tr>
          {countries?.sort((a,b) => a.name.localeCompare(b.name)).map((country, index: number) => (
            <tr data-testid={`country-row-${index}`} className={countryParam === country.name ? "selected" : ""} key={index} onClick={() => handleChangeCountry(country)}>
              <td>{`${country.name} (${country.count})`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
     
    </div>
  );
};
