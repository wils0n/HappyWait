
module.exports = function(sequelize, DataTypes) {
  var Queue = sequelize.define('Queue', 
    {
      idQueue : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
      },
      descripcion: {
        type : DataTypes.STRING,
        allowNull : false
      }
    }, 
    {
      createdAt : "fechaCreacion",
      updatedAt : "fechaModificacion",
      tableName : "queue",
      classMethods: {
        associate: function(models) {
          Queue.belongsTo(models.Establecimiento, {foreignKey: 'idEstablecimiento',as:"establecimiento"});
          Queue.belongsToMany(models.Usuario,
            {
              through:{
                model: models.Turno,
                unique:false
              },
              foreignKey:"idQueue",
              as:{
                singular:"usuario",
                plural:"usuarios"
              }
            }
          );
      }
    }
  });
  return Queue;
};