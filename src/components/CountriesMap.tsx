// @@     To - Do:
//          Map Component:
//            https://www.react-simple-maps.io/examples/map-chart-with-tooltip/
//            Add tooltips to highlighted countries
//            Remove ugly onclick (userSelect), but the tooltip example doesn't have it as bad
//            Convert inline styles to emotion due to automatic polyfilling

//          Index Page:
//            GetStaticProps

//          Misc:
//            Remove redundant files

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { getAllISOByCurrencyOrSymbol } from "iso-country-currency";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CountriesMap = (props: {
  hasFilteredCurrencies: boolean;
  filteredCurrencies: [string, number][];
}) => {
  const { hasFilteredCurrencies, filteredCurrencies } = props;
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

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
    setFilteredCountries(
      currencies.flatMap((c) => getAllISOByCurrencyOrSymbol("currency", c[0]))
    );
  }, [filteredCurrencies]);

  return (
    <div>
      <ComposableMap
        onClick={() => {
          return;
        }}
        style={{
          zIndex: "8",
          maxWidth: "100vw",
          maxHeight: "100vh",
          transition: "all 0.5s",
          background: "dodgerblue",
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHighlighted =
                filteredCountries?.indexOf(geo.properties.ISO_A2) !== -1;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? "greenyellow" : "lightgray"}
                  // onClick={() => console.log(geo.properties.ISO_A3)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default CountriesMap;
