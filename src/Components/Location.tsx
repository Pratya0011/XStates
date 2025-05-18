import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
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
          <Autocomplete
            options={countries}
            value={countryName}
            onChange={(event: any, value: any) => {
              setCountryName(value);
            }}
            onInputChange={(event, value, reason) => {
              if (reason === "selectOption") {
                getState(value);
              }
              if (reason === "clear") {
                setStateName("");
                setStates([]);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
        </Grid>
        <Grid size={2}>
          <Autocomplete
            options={states}
            value={stateName}
            onChange={(event: any, value: any) => {
              setStateName(value);
            }}
            onInputChange={(event, value, reason) => {
              if (reason === "selectOption") {
                getCity(value);
              }
              if (reason === "clear") {
                setCityName("");
                setCities([]);
              }
            }}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
        </Grid>
        <Grid size={2}>
          <Autocomplete
            options={cities}
            value={cityName}
            onChange={(event: any, value: any) => {
              setCityName(value);
            }}
            renderInput={(params) => <TextField {...params} label="City" />}
          />
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
