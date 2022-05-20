const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    cca3: {
      type : DataTypes.STRING(3),
      allowNull : false,
      primaryKey : true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    continents: {
      type: DataTypes.STRING,
      allowNull: false,
      
    }, 
    capital: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Not declared",
      set(value) {
        this.setDataValue('capital', value.join("{}"))
      }
    },
    subregion: {
      type: DataTypes.STRING,
      defaultValue: "Not declared",
    },
    area: {
      type: DataTypes.STRING,
    },
    population: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    }
  }, { timestamps: false });
};

//* timestamps: false sirve para evitar que sequelize realize ciertas configuraciones por defecto ya que sino, las consultas que hagamos
//* directamente desde SQL, no se actualizaran automaticament.