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
  filteredCountries: string[];
  isoCountries: string[];
}) => {
  const { hasFilteredCurrencies, filteredCurrencies, filteredCountries, isoCountries } = props;

  return (
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
              isoCountries?.indexOf(geo.properties.ISO_A2) !== -1;

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
  );
};

export default CountriesMap;
