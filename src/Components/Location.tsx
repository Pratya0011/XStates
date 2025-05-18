import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Location() {
  const [countries, setCountries] = useState<string[]>([]);
  const [countryName, setCountryName] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);
  const [stateName, setStateName] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const [cityName, setCityName] = useState<string>("");
  useEffect(() => {
    getCountry();
  }, []);
  const getCountry = async () => {
    try {
      const { status, data } = await axios.get(
        `https://crio-location-selector.onrender.com/countries`
      );
      if (status === 200) {
        setCountries(data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getState = async (countryname: string = "") => {
    try {
      const { status, data } = await axios.get(
        `https://crio-location-selector.onrender.com/country=${countryname}/states`
      );
      if (status === 200) {
        setStates(data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getCity = async (statename: string = "") => {
    try {
      const { status, data } = await axios.get(
        `https://crio-location-selector.onrender.com/country=${countryName}/state=${statename}/cities`
      );
      if (status === 200) {
        setCities(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setCountryName(selectedCountry);
    if (selectedCountry) {
      getState(selectedCountry);
    }
  };
  return (
    <Grid>
      <Typography variant="h4">Select Location</Typography>
      <Grid
        container
        spacing={2}
        mt={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid size={6}>
          <label htmlFor="country-select">Country:</label>
          <select
            id="country-select"
            value={countryName}
            onChange={handleChange}
            style={{ height: 30 }}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </Grid>

        <Grid size={2}>
          <label htmlFor="state-select">State:</label>
          <select
            id="state-select"
            value={stateName}
            onChange={(e) => {
              const value = e.target.value;
              setStateName(value);
              getCity(value);
            }}
            disabled={!countryName}
            style={{ height: 30 }}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </Grid>

        <Grid size={2}>
          <label htmlFor="city-select">City:</label>
          <select
            id="city-select"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            disabled={!countryName || !stateName}
            style={{ height: 30 }}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </Grid>
      </Grid>

      {countryName && stateName && cityName && (
        <Grid mt={2}>
          <Typography variant="h6" component="span">
            You Selected{" "}
            <Typography variant="h5" component="span">
              {countryName},{" "}
            </Typography>
            <Typography variant="h6" component="span" sx={{ color: "grey" }}>
              {stateName}, {cityName}
            </Typography>
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default Location;
