const { DataTypes } = require ("sequelize");

//Aqui cremos los modelos para la posterior creacion de las tablas. En este caso es el modelo de Actividades.
module.exports = (sequelize) => {
    sequelize.define("activity",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, //* pasamos el id como key
            autoIncrement: true //* permitimos que se pueda autoincrementar el id 
        },
        name: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.STRING,
            validate:{
                min: 1,
                max: 5,
            }
        },
        duration: {
            type: DataTypes.STRING,
        },
        seasson: {
            type: DataTypes.ENUM("Summer", "Spring", "Fall" , "Winter")
        }
    }, {timestamps: false});
};

//* timestamps: false sirve para evitar que sequelize realize ciertas configuraciones por defecto ya que sino, las consultas que hagamos
//* directamente desde SQL, no se actualizaran automaticament.