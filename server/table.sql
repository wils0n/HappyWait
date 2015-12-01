CREATE TABLE `establecimiento` (
  `idEstablecimiento` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `urlImg` varchar(255) DEFAULT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime NOT NULL,
  PRIMARY KEY (`idEstablecimiento`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `queue` (
  `idQueue` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime NOT NULL,
  `idEstablecimiento` int(11) DEFAULT NULL,
  PRIMARY KEY (`idQueue`),
  KEY `idEstablecimiento` (`idEstablecimiento`),
  CONSTRAINT `queue_ibfk_1` FOREIGN KEY (`idEstablecimiento`) REFERENCES `establecimiento` (`idEstablecimiento`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `usuario` (
  `dni` varchar(255) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime NOT NULL,
  PRIMARY KEY (`dni`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `turno` (
  `idTurno` int(11) NOT NULL AUTO_INCREMENT,
  `posicion` int(11) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime NOT NULL,
  `fechaEliminacion` datetime DEFAULT NULL,
  `idQueue` int(11) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idTurno`),
  KEY `idQueue` (`idQueue`),
  KEY `dni` (`dni`),
  CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`idQueue`) REFERENCES `queue` (`idQueue`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `turno_ibfk_2` FOREIGN KEY (`dni`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
