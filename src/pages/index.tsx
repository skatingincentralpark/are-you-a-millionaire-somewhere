import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import NumberFormat from "react-number-format";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  getAllCountriesByCurrencyOrSymbol,
  getAllISOByCurrencyOrSymbol,
} from "iso-country-currency";
import { GetRatesResults } from "../types";

import {
  FormControl,
  InputLabel,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  Container,
  InputAdornment,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import GradientText from "../components/GradientText";

import CountriesMap from "../components/CountriesMap";

const Home: NextPage = ({ results }: any) => {
  // const Home: NextPage = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("AUD");
  const [currencies, setCurrencies] = useState(topCurrencies);
  const [filteredCurrencies, setFilteredCurrencies] = useState<
    [string, number][]
  >([]);
  const [isoCountries, setIsoCountries] = useState<string[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [showCountryName, setShowCountryName] = useState(false);

  const handleChange = (e: any) => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    submitHandler();
  }, [currency]);

  const entries: [string,number][] = Object.entries(results?.rates);
  const allCurrencies = entries.map((x) => x[0]);

  const submitHandler = () => {
    if (!entries || !results) return;
    const selectedCurrency = entries.find((c) => c[0] === currency);
    const usd = entries.find((c) => c[0] === "USD");

    if (!selectedCurrency || !usd) return;
    const a: number = usd[1]
    const b: number = selectedCurrency[1]

    const convertedToUsd = (a / b) * amount;

    const newFilteredCurrencies = entries.filter(
      (c) => (c[1] / a) * convertedToUsd > 1000000
    );
    setFilteredCurrencies(newFilteredCurrencies);
  };

  // Convert currencies to countries
  useEffect(() => {
    const currencies = filteredCurrencies.filter((c) => {
      // iso-country-currency doesn't recognise these
      if (
        c[0] === "BYR" ||
        c[0] === "ZMK" ||
        c[0] === "LTL" ||
        c[0] === "MRO" ||
        c[0] === "SVC" ||
        c[0] === "CUC" ||
        c[0] === "GGP" ||
        c[0] === "IMP" ||
        c[0] === "BTC" ||
        c[0] === "JEP" ||
        c[0] === "LVL" ||
        c[0] === "XAG" ||
        c[0] === "XAU" ||
        c[0] === "XDR" ||
        c[0] === "CLF"
      )
        return;
      return true;
    });

    setIsoCountries(
      currencies.flatMap((c) => getAllISOByCurrencyOrSymbol("currency", c[0]))
    );

    setFilteredCountries(
      currencies.flatMap((c) =>
        getAllCountriesByCurrencyOrSymbol("currency", c[0])
      )
    );
  }, [filteredCurrencies]);
  
  return (
    <Container sx={{ padding: "2rem" }}>
      <Head>
        <title>Where are you a millionaire?</title>
        <meta
          name="description"
          content="Web app to convert your money to different currencies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 6, md: 3 }}
        minHeight="90vh"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          direction={{ xs: "column" }}
          spacing={{ xs: 2 }}
          justifyContent="center"
          maxWidth="sm"
        >
          <Typography variant="h1" component="div" fontWeight="600">
            Where are you a <GradientText primary={"Millionaire?"} />
          </Typography>
          <Typography variant="h2">
            Convert your money to see if it exceeds 1m in any country <br/><br/>
          </Typography>
          <Typography variant="h4" color="gray">
            {filteredCurrencies.length} countr{filteredCurrencies.length === 1 ? 'y' : 'ies'}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column" }}
          spacing={{ xs: 2 }}
          justifyContent="center"
          width={{ xs: "100%" }}
        >
          <NumberFormat
            customInput={TextField}
            onValueChange={(values) => setAmount(parseInt(values.value))}
            value={amount}
            thousandSeparator
            variant="outlined"
            label="Enter your money..."
            placeholder="10,000"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getSymbolFromCurrency(currency)}
                </InputAdornment>
              ),
            }}
            inputProps={{
              style: {
                textAlign: "right",
              },
            }}
          />

          <Button variant="contained" onClick={submitHandler}>
            Submit
          </Button>
          <FormControl>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              label="Currency"
              autoWidth
              onChange={handleChange}
            >
              {currencies.map((x) => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="text"
              onClick={() => {
                setCurrencies((c) =>
                  c === topCurrencies ? allCurrencies : topCurrencies
                );
              }}
              sx={{ marginTop: "1rem" }}
            >
              {currencies === topCurrencies
                ? "Show more currencies"
                : "Show less currencies"}
            </Button>
          </FormControl>
        </Stack>
        <Box
          sx={{
            width: `${!filteredCurrencies.length ? "0" : "100%"}`,
            transition: "all 0.5s",
            overflowX: "hidden",
          }}
        >
          <List
            sx={{
              minWidth: "25rem",
              bgcolor: `${!showCountryName && "#f1f1f1"}`,
              maxHeight: "50vh",
              overflowY: "auto",
              overflowX: "auto",
              transition: "all 0.5s",
            }}
          >
            {!showCountryName
              ? filteredCurrencies.map((c) => (
                  <ListItem alignItems="flex-start" key={c[0]}>
                    <ListItemText primary={c[0]} secondary={c[1]} />
                  </ListItem>
                ))
              : filteredCountries.map((c, i) => (
                  <ListItem alignItems="flex-start" key={`${c[0]}${i}`}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          fontWeight="600"
                          style={{
                            color: "black",
                            fontSize: "1.4rem",
                            lineHeight: "1.2",
                          }}
                        >
                          {c}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
          </List>

          <Button
            onClick={() => {
              setShowCountryName((x) => !x);
            }}
            sx={{ marginTop: "0.5rem", minWidth: "max-content" }}
          >
            {!showCountryName ? "Show Country Names" : "Show Currency Names"}
          </Button>
        </Box>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <CountriesMap
          hasFilteredCurrencies={filteredCurrencies.length > 0}
          filteredCurrencies={filteredCurrencies}
          filteredCountries={filteredCountries}
          isoCountries={isoCountries}
        />
      </Box>
    </Container>
  );
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.NEXT_PUBLIC_EXCHANGE_API_KEY}`
  );
  const results: GetRatesResults = await res.json();

  return {
    props: {
      results,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 86400, // In seconds
  };
};

export default Home;

const topCurrencies: string[] = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "HKD",
  "NZD",
  "SEK",
  "KRW",
  "SGD",
  "NOK",
  "MXN",
  "INR",
  "RUB",
  "ZAR",
  "TRY",
  "BRL",
  "TWD",
  "DKK",
  "PLN",
  "THB",
  "IDR",
  "HUF",
  "CZK",
  "ILS",
  "CLP",
  "PHP",
  "AED",
  "COP",
  "SAR",
  "MYR",
  "RON",
];
