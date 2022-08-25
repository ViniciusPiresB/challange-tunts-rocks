const axios = require("axios");

const getAllCountriesData = async () => {
  const countries = (await axios.get("https://restcountries.com/v2/all")).data;

  let body = [];

  for (const i in countries) {
    const country = countries[i];

    const name = country["name"];
    const capital = country["capital"] ? country["capital"] : "-";
    const area = country["area"] ? country["area"] : "-";
    const currenciesObj = country["currencies"] ? country["currencies"] : "-";

    let currencies = "";
    for (const i in currenciesObj) {
      const currencyObj = currenciesObj[i];
      currencies = currencies + currencyObj["code"] + ",";
    }

    currencies = currencies.slice(0, -1);
    if (currencies == "undefined") currencies = "-";

    const line = {
      name,
      capital,
      area,
      currencies
    };

    body.push(line);
  }

  return body;
};

exports.getAllCountriesData = getAllCountriesData;
