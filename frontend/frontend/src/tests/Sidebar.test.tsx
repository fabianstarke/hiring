import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "../components/Sidebar";
import { CountryContext } from "../context/CountryContext";
import userEvent from "@testing-library/user-event";


const mockedCountries = [
  {
    name: "France",
    count: 7,
  },
  {
    name: "Switzerland",
    count: 10,
  },
];
describe("SideBar", () => {
  describe("when countries are fetched", () => {
    const countries = {
      countries: mockedCountries,
      setCountries: jest.fn(),
    };

    beforeEach(() => {
      
      render(
        <CountryContext.Provider value={countries}>
          <Sidebar />
        </CountryContext.Provider>
      );
    });

    it("renders countries", () => {
      expect(screen.getByText(mockedCountries[0].name)).toBeInTheDocument();

    })

    

/*     countries.countries.forEach((country, index) => {
      it(`renders country ${country.name}`, () => {
        expect(screen.getByText(country.name)).toBeInTheDocument();
      });

      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    screen.debug(); */
  });
});
