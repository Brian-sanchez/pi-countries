//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require("axios");
const { Country } =require("./src/db");
const port = process.env.PORT || 8080;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  //* Aca traigo la informacion de la api que necesite
  const countriesApi = await axios.get("https://restcountries.com/v3.1/all");

  const modelCountry = countriesApi.data.map((e) => ({
    cca3: e.cca3,
    name: e.name.common,
    flags: e.flags.svg,
    continents: e.region,
    capital: e.capital,
    subregion: e.subregion,
    area: e.area,
    population: e.population,
    status: e.status
  }));

  await Country.bulkCreate(modelCountry);
  //* bulkCreate nos permite insertar multiples registros en la tabla de la base de datos 
  //* con una sola llamada de funcion 
  
  server.listen(port, () => {
    console.log(`server listen at ${port}`); // eslint-disable-line no-console
  });
});
