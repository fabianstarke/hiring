import { render, screen, fireEvent } from "@testing-library/react";
import { CitiesList } from "../components/CitiesList";
import { CityContext } from "../context/CityContext";

const mockedCities = [
  {
    name: "Geneve",
    country: "Switzerland",
    subcountry: "Geneva",
    geonameid: 1234,
  },
  {
    name: "Lausanne",
    country: "Switzerland",
    subcountry: "Vaud",
    geonameid: 5678,
  },
];

const cityProvider = {
  cities: mockedCities,
  setCities: jest.fn(),
};

describe("CitiesList", () => {
  describe("when cities are fetched", () => {
    beforeEach(() => {
      render(
        <CityContext.Provider value={cityProvider}>
          <CitiesList />
        </CityContext.Provider>
      );
      screen.debug()

    });
    it("renders cities", () => {
      expect(screen.getByText(mockedCities[0].name)).toBeInTheDocument();
    })
  });
}
);
