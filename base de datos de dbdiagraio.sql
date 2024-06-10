CREATE TABLE `Usuarios` (
  `ID_Usuario` INT PRIMARY KEY AUTO_INCREMENT,
  `NombreUsuario` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `Contrasena` VARCHAR(255) NOT NULL,
  `TipoSuscripcion` ENUM(Gratuito,Basico,Premium,VIP) DEFAULT 'Gratuito'
);

CREATE TABLE `Estrellas` (
  `ID_Estrella` INT PRIMARY KEY AUTO_INCREMENT,
  `ID_Constellations` INT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Tipo` VARCHAR(50),
  `Masa` DECIMAL(10,2),
  `Luminosidad` DECIMAL(10,2),
  `ApadrinadaPor` INT DEFAULT null
);

CREATE TABLE `Favoritos` (
  `ID_Usuario` INT,
  `ID_Estrella` INT
);

CREATE TABLE `Constellations` (
  `ID_Grupo` INT,
  `NombreGrupo` VARCHAR(50) NOT NULL
);

CREATE TABLE `UserGroups` (
  `ID_Grupo` INT PRIMARY KEY AUTO_INCREMENT,
  `ID_Usuario` INT
);

ALTER TABLE `Estrellas` ADD FOREIGN KEY (`ApadrinadaPor`) REFERENCES `Usuarios` (`ID_Usuario`);

ALTER TABLE `Favoritos` ADD FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuarios` (`ID_Usuario`);

ALTER TABLE `Favoritos` ADD FOREIGN KEY (`ID_Estrella`) REFERENCES `Estrellas` (`ID_Estrella`);

ALTER TABLE `UserGroups` ADD FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuarios` (`ID_Usuario`);

ALTER TABLE `Constellations` ADD FOREIGN KEY (`ID_Grupo`) REFERENCES `Estrellas` (`ID_Constellations`);
