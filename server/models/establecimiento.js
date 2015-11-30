module.exports = function(sequelize, DataTypes) {
  var Establecimiento = sequelize.define('Establecimiento', 
    {
      idEstablecimiento : {
        type : DataTypes.INTEGER,
        allowNull : true,
        primaryKey : true,
        autoIncrement : true
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull : false
      },
      lat : {
        type: DataTypes.REAL,
      },
      lng : {
        type : DataTypes.REAL
      },
      urlImg: {
          type:DataTypes.STRING
      }
    }
    ,
    {
      createdAt : "fechaCreacion",
      updatedAt : "fechaModificacion",
      deletedAt : false,
      tableName : "establecimiento",
      classMethods: {
        associate: function(models) {
          Establecimiento.hasMany(models.Queue,{foreignKey: 'idEstablecimiento',as: {singular:'queue',plural:'queues'}});
        }
      }
    }
  );
  return Establecimiento;
};