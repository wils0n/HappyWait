module.exports = function(sequelize, DataTypes) {
  var Usuario = sequelize.define('Usuario', 
    {
      dni:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique:true
      },
      nombres: {
        type : DataTypes.STRING,
        allowNull : false
      }
    }, 
    {
      createdAt : "fechaCreacion",
      updatedAt : "fechaModificacion",
      deletedAt : false,
      tableName : "usuario",
      classMethods: {
        associate: function(models) {
          Usuario.belongsToMany(models.Queue,
            {
              through:{
                model:models.Turno,
                unique:false
              },
              foreignKey:"dni",
              as:{
                singular:"queue",
                plural:"queues"
              }
            }
          );
        }
      }
    }
  );
  return Usuario;
};