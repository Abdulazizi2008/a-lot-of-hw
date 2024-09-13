import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountries, toggleSelectedCountry } from "../store";
import { Table, Button } from "flowbite-react";

const CountriesTable = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const selectedCountries = useSelector(
    (state) => state.countries.selectedCountries
  );

  const [showSelected, setShowSelected] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      dispatch(setCountries(data));
    };
    fetchCountries();
  }, [dispatch]);

  const handleToggleSelected = () => {
    setShowSelected(!showSelected);
  };

  return (
    <div className="px-[50px]">
      <Button onClick={handleToggleSelected} className="mt-4">
        {showSelected ? "Hide Selected" : "Tanlanganlar"}
      </Button>

      {showSelected && (
        <div>
          <h2 className="pt-5 text-[24px] font-[600] ">Tanlangan Davlatlar:</h2>
          <ul className="flex flex-col gap-2 bg-gray-500 max-w-[700px] p-5 rounded-3xl">
            {selectedCountries.map((country) => (
              <li
                key={country.cca3}
                className="flex gap-[200px] items-center text-white "
              >
                <p className="pt-4">{country.name.common}</p>{" "}
                <p>{country.population.toLocaleString()}</p>
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  width="50"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="overflow-x-auto pt-8">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Countries</Table.HeadCell>
            <Table.HeadCell>Population</Table.HeadCell>
            <Table.HeadCell>Flag</Table.HeadCell>
            <Table.HeadCell>Like</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {countries.map((country) => (
              <Table.Row key={country.cca3}>
                <Table.Cell>{country.name.common}</Table.Cell>
                <Table.Cell>{country.population.toLocaleString()}</Table.Cell>
                <Table.Cell>
                  <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    width="50"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => dispatch(toggleSelectedCountry(country))}
                    color={
                      selectedCountries.some(
                        (c) => c.name.common === country.name.common
                      )
                        ? "failure"
                        : "success"
                    }
                  >
                    {selectedCountries.some(
                      (c) => c.name.common === country.name.common
                    )
                      ? "Unlike"
                      : "Like"}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default CountriesTable;
