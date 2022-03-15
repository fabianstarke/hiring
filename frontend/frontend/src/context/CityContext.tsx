import { createContext, useState } from "react";
import { City } from "../models/city";

interface CityContextProps {
  cities: City[] | null;
  setCities: (cities: City[]) => void;
}

export const CityContext = createContext<CityContextProps>(
  {} as CityContextProps
);

export const CityProvider = (children: any) => {
  const [cities, setCities] = useState<City[] | null>(null);

  return (
    <CityContext.Provider value={{ cities, setCities }}>
      {children}
    </CityContext.Provider>
  );
};
