//* Este controller es el que nos hace de intermediario entre las rutas y la api.

const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");

//* Aqui creamos las funciones que van hacer las peticiones de nuestras rutas.

//* Esta funcion traera todos los paises.
async function getAllCountries(req, res)  {
    try {
        const countries = await Country.findAll({
            include: Activity
        }); 

        res.json(countries); 
    } catch (error) {
        console.log(error);
    };
};

//* Esta funcion trae los paises por query ejem:(?name="Spain")
async function getByName(req, res, next)  {
    const { name } = req.query;
    //? req.params contiene parámetros de ruta (en la parte de la ruta de la URL) y req.query contiene 
    //? los parámetros de consulta de la URL (después de ? en la URL).

    try {
        if (!name) {
            res.send("No estas buscando por nombre");
        } else {
            let countrieQuery = await Country.findAll({
                where: {
                name: {[Op.iLike]: `%${name}%`}
                },
                include: Activity
            });

            if (countrieQuery.length <= 0) {
                return res.status(404).json({
                    error: `No se encuentra ningun Pais con el nombre "${name}"`, 
                });
            };

            res.json(countrieQuery);
        };
    } catch (error) {
        console.log(error);
    };
};

//** Esta funcion trae los paises segun su id por params.
async function getById (req, res) {
    const id = req.params.id.toUpperCase();
    console.log(id);

    try {
        let countriesid = await Country.findByPk(id, {
            include: Activity
        });

        res.json( countriesid ? countriesid : console.log("No hay paises con ese ID"));
    } catch (error) {
        console.log(error);
    }
};


module.exports = { getById, getByName, getAllCountries };