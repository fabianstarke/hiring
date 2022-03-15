import { createContext, useState } from "react";
import { Country } from "../models/country";

interface CountryContextProps {
  countries: Country[] | null;
  setCountries: (countries: Country[]) => void;
}

export const CountryContext = createContext<CountryContextProps>(
  {} as CountryContextProps
);

export const CountryProvider = (children: any) => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  return (
    <CountryContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountryContext.Provider>
  );
};
