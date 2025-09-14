-- Active: 1717691537877@@127.0.0.1@3306@interfacultades
CREATE DATABASE interfacultades; 
USE interfacultades;

CREATE TABLE rol (
    `idrol` INT AUTO_INCREMENT PRIMARY KEY,
    `rodescripcion` VARCHAR(50) NOT NULL
);

CREATE TABLE menu (
    `idmenu` INT AUTO_INCREMENT PRIMARY KEY,
    `menuNombre` VARCHAR(50) NOT NULL,
    `medescripcion` VARCHAR(150) NOT NULL
);

CREATE TABLE menurol (
    `idmenurol` INT AUTO_INCREMENT PRIMARY KEY,
    `idmenu` INT NOT NULL,
    `idrol` INT NOT NULL,
    FOREIGN KEY (idmenu) REFERENCES menu(idmenu),
    FOREIGN KEY (idrol) REFERENCES rol(idrol)
);

CREATE TABLE usuario (
    `idusuario` INT AUTO_INCREMENT PRIMARY KEY,
    `usnombre` VARCHAR(50) NOT NULL,
    `usapellido` VARCHAR(50) NOT NULL,
    `usmail` VARCHAR(80) NOT NULL,
    `uspass` VARCHAR(50) NOT NULL,
    `idrol` INT NOT NULL,
    FOREIGN KEY (idrol) REFERENCES rol(idrol)
);

CREATE TABLE publicacion (
    `idpublicacion` INT AUTO_INCREMENT PRIMARY KEY,
    `titulo` VARCHAR(50) NOT NULL,
    `contenido` TEXT NOT NULL,
    `fecha` DATE NOT NULL,
    `imagen` VARCHAR(100) NOT NULL,
    `idusuario` INT NOT NULL,
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);

CREATE TABLE facultad (
    `idFacultad` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(50) NOT NULL,
    `siglas` VARCHAR(10) NOT NULL,
    `puntos` INT(50)
);

CREATE TABLE equipo (
    `idequipo` INT AUTO_INCREMENT PRIMARY KEY,
    `idFacultad` INT NOT NULL,
    FOREIGN KEY (idFacultad) REFERENCES Facultad(idFacultad)
);

CREATE TABLE disciplina (
    `idDisciplina` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(50) NOT NULL,
    `reglamento` VARCHAR(250) NOT NULL
);

CREATE TABLE convocatoria (
    `idconvocatoria` INT AUTO_INCREMENT PRIMARY KEY,
    `fechainicio` DATE NOT NULL,
    `fecha` DATE NOT NULL
);

CREATE TABLE inscripcion (
    `idinscripcion` INT AUTO_INCREMENT PRIMARY KEY,
    `idUsuario` INT NOT NULL,
    `idDisciplina` INT NOT NULL,
    `idconvocatoria` INT NOT NULL,
    `legajo` VARCHAR(15) NOT NULL,
    `talleRemera` VARCHAR(10) NOT NULL,
    `DNI` VARCHAR(20) NOT NULL,
    `carrera` VARCHAR(50) NOT NULL,
    `fechaNac` DATE NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idusuario),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina),
    FOREIGN KEY (idconvocatoria) REFERENCES Convocatoria(idconvocatoria)
);

CREATE TABLE jugadorEquipo (
    `idjugadorEquipo` INT AUTO_INCREMENT PRIMARY KEY,
    `idinscripcion` INT NOT NULL,
    `idDisciplina` INT NOT NULL,
    `idequipo` INT NOT NULL,
    FOREIGN KEY (idinscripcion) REFERENCES inscripcion(idinscripcion),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina),
    FOREIGN KEY (idequipo) REFERENCES equipo(idequipo)
);

CREATE TABLE partido (
    `idpartido` INT AUTO_INCREMENT PRIMARY KEY,
    `idequipo1` INT NOT NULL,
    `idequipo2` INT NOT NULL,
    `resEquipo1` INT(50),
    `resEquipo2` INT(50),
    `fecha` DATE NOT NULL,
    `hora` TIME NOT NULL,
    `lugar` VARCHAR(50) NOT NULL,
    `idDisciplina` INT NOT NULL,
    FOREIGN KEY (idequipo1) REFERENCES equipo(idequipo),
    FOREIGN KEY (idequipo2) REFERENCES equipo(idequipo),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina)
);