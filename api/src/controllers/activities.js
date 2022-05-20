//* Este controller es el que nos hace de intermediario entre las rutas y la api.

const { Activity, Country } = require("../db.js");


//Esta funcion trae todas las actividades.
async function getAllActivities(req, res) {
    try {
        const countries = await Activity.findAll() 
    } catch (error) {
        console.log(error);
    };
};

//Esta funcion agrega las actividades. Y si ya esta creada la actividad, le añade el o los paises. Y si la actividad no esta creada la grega con los paises.
async function addActivity(req, res)  {
    const { name, difficulty, duration, seasson, cca3 } = req.body;
    //? el req.body permite acceder a los datos en una cadena o un objeto JSON desde el lado del cliente.

    try {
        const matchActivity = await Activity.findOne({
            where: {
                name: name,
            }
        });

        const countrymatch = await Country.findAll({
            where: {
            cca3: cca3,
            },
        });

        if (!matchActivity) {
            const createActivity = await Activity.create({
                name: name,
                difficulty: difficulty,
                duration: duration,
                seasson: seasson,
            });

            const addCountry = await createActivity.addCountries(countrymatch);
            console.log(addCountry);
            return res.send(addCountry);
        };

        const matchedActivity = await matchActivity.addCountries(countrymatch);
        res.send(matchedActivity);
    } catch (error) {
        console.log(error);
    };
};

module.exports = { addActivity, getAllActivities };