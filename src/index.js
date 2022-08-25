const excel = require("excel4node");
const { styleTitle, styleSubTitle } = require("./style/index.js");
const { getAllCountriesData } = require("./getAllCountriesData.js");

const wb = new excel.Workbook();
const ws = wb.addWorksheet("Main sheet");

const tileStyle = wb.createStyle(styleTitle);
const subTitleStyle = wb.createStyle(styleSubTitle);

ws.cell(1, 1, 1, 4, true);
ws.cell(1, 1).string("Countries List").style(tileStyle);
ws.cell(2, 1).string("Name").style(subTitleStyle);
ws.cell(2, 2).string("Capital").style(subTitleStyle);
ws.cell(2, 3).string("Area").style(subTitleStyle);
ws.cell(2, 4).string("Currencies").style(subTitleStyle);

(async () => {
  const allCountries = await getAllCountriesData();
  const columns = ["name", "capital", "area", "currencies"];

  let line = 3;
  for (let i in allCountries) {
    for (let dataColumn in columns) {
      ws.cell(line, parseInt(dataColumn) + 1).string(
        allCountries[i][columns[dataColumn]].toString()
      );
    }
    line++;
  }

  wb.write("result.xlsx");
})();
