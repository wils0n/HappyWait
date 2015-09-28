module.exports = function(sequelize, DataTypes) {
  var Turno = sequelize.define('Turno', 
    {
      idTurno : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
      },
		  posicion: {
        type : DataTypes.INTEGER,
        allowNull : false
		  }
    }, 
    {
      paranoid:true,
		  createdAt : "fechaCreacion",
		  updatedAt : "fechaModificacion",
		  deletedAt : "fechaEliminacion",
		  tableName : "turno" 
    }
  );
  return Turno;
};  