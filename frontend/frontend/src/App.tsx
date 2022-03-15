import React, { useMemo, useState } from "react";
import "./App.css";
import { CitiesList } from "./components/CitiesList";
import { Sidebar } from "./components/Sidebar";
import { City } from "./models/city";
import { Country } from "./models/country";
import { CountryContext } from "./context/CountryContext";
import { CityContext } from "./context/CityContext";
import { FromAndLimitContext } from "./context/FromAndLimitContext";

function App() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [cities, setCities] = useState<City[] | null>(null);
  const [fromAndLimit, setFromAndLimit] = useState<{
    from: number;
    limit: number;
    max: number;
  }>({ from: 0, limit: 50, max: 500 });

  const countryProvider = useMemo(
    () => ({ countries, setCountries }),
    [countries, setCountries]
  );

  const cityProvider = useMemo(
    () => ({ cities, setCities }),
    [cities, setCities]
  );

  const fromAndLimitProvider = useMemo(
    () => ({ fromAndLimit, setFromAndLimit }),
    [fromAndLimit, setFromAndLimit]
  );

  return (
    <div className="App">
      <h1>Cities App</h1>
      <div className="lists">
        <CountryContext.Provider value={countryProvider}>
          <FromAndLimitContext.Provider value={fromAndLimitProvider}>
            <CityContext.Provider value={cityProvider}>
              <Sidebar />
              <CitiesList />
            </CityContext.Provider>
          </FromAndLimitContext.Provider>
        </CountryContext.Provider>
      </div>
    </div>
  );
}

export default App;
