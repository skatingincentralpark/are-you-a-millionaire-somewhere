import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import rates from "../../data/users/rates.json";
import NumberFormat from "react-number-format";
import getSymbolFromCurrency from "currency-symbol-map";

import {
  FormControl,
  InputLabel,
  TextField,
  Button,
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

// const Home: NextPage = ({rates}: InferGetStaticPropsType<typeof getStaticProps>) => {
const Home: NextPage = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("AUD");
  const [currencies, setCurrencies] = useState(topCurrencies);
  const [filteredCurrencies, setFilteredCurrencies] = useState<
    [string, number][]
  >([]);

  const handleChange = (e: any) => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    submitHandler();
  }, [currency]);

  const entries = Object.entries(rates.rates);
  const allCurrencies = entries.map((x) => x[0]);

  const submitHandler = () => {
    const selectedCurrency = entries.find((c) => c[0] === currency);
    const usd = entries.find((c) => c[0] === "USD");
    if (!selectedCurrency || !usd) return;
    const convertedToUsd = (usd[1] / selectedCurrency[1]) * amount;

    setFilteredCurrencies(
      entries.filter((c) => (c[1] / usd[1]) * convertedToUsd > 1000000)
    );
  };

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
        spacing={{ xs: 6, md: 4 }}
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
          <Typography variant="h2">Money conversion to check</Typography>
        </Stack>

        <Stack
          direction={{ xs: "column" }}
          spacing={{ xs: 2 }}
          justifyContent="center"
          width={{ xs: "100%", s: "100%" }}
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
        <List
          sx={{
            width: `${!filteredCurrencies.length ? "0" : "100%"}`,
            bgcolor: "#f1f1f1",
            // background: "-webkit-linear-gradient(#ffb2fa, #ff8383)",
            maxHeight: "50vh",
            overflow: "auto",
            transition: "all 0.5s",
          }}
        >
          {filteredCurrencies.map((c) => (
            <ListItem alignItems="flex-start" key={c[0]}>
              <ListItemText primary={c[0]} secondary={c[1]} />
            </ListItem>
          ))}
        </List>
      </Stack>
      <CountriesMap
        hasFilteredCurrencies={filteredCurrencies.length > 0}
        filteredCurrencies={filteredCurrencies}
      />
    </Container>
  );
};

// process.env.EXCHANGE_API_KEY

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // revalidation is enabled and a new request comes in
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.NEXT_PUBLIC_EXCHANGE_API_KEY}`)
//   const rates = await res.json()
//   console.log(rates)

//   return {
//     props: {
//       rates,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every 10 seconds
//     revalidate: 86400, // In seconds
//   }
// }

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
