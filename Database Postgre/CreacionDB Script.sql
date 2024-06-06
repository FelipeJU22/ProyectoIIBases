--1.Crear tabla Camas

CREATE TABLE "Camas" (
    "numeroCama" INTEGER NOT NULL PRIMARY KEY,
    "camaUCI" BOOLEAN NOT NULL,
    salon INTEGER NOT NULL
);

--2.Crear tabla EquipoMedico

CREATE TABLE "EquipoMedico" (
    nombre TEXT NOT NULL PRIMARY KEY,
    proveedor TEXT,
    cantidad INTEGER NOT NULL
);

--3.Crear tabla EquipoPorCama

CREATE TABLE "EquipoPorCama" (
    "numCama" INTEGER NOT NULL,
    equipo TEXT NOT NULL,
    PRIMARY KEY ("numCama", equipo)
);

--4.Crear tabla HistorialClinico

CREATE TABLE "HistorialClinico" (
    "cedulaPaciente" INTEGER NOT NULL,
    "fechaProcedimiento" DATE NOT NULL,
    tratamiento TEXT[] NOT NULL,
    procedimiento TEXT[] NOT NULL,
    PRIMARY KEY ("cedulaPaciente", procedimiento)
);

--5.Crear tabla Paciente

CREATE TABLE "Paciente" (
    cedula INTEGER NOT NULL PRIMARY KEY,
    telefono TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido1 TEXT NOT NULL,
    apellido2 TEXT,
    direccion TEXT,
    "fechaNacimiento" DATE NOT NULL,
    contraseña TEXT
);


--6.Crear tabla PatologiasPorPaciente
CREATE TABLE PatologiasPorPaciente (
    nombrePatologia TEXT NOT NULL,
    tratamientoPatologia TEXT,
    cedula INTEGER NOT NULL,
    PRIMARY KEY (nombrePatologia, cedula),
);

--7.Crear tabla Personal

CREATE TABLE "Personal" (
    cedula INTEGER NOT NULL PRIMARY KEY,
    telefono TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido1 TEXT NOT NULL,
    apellido2 TEXT NOT NULL,
    direccion TEXT NOT NULL,
    rol INTEGER NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "fechaIngreso" DATE NOT NULL
);

--8.Crear tabla ProcedimientoPorReservacion

CREATE TABLE "ProcedimientoPorReservacion" (
    "nombreProcedimiento" TEXT NOT NULL,
    "IDReservacion" INTEGER NOT NULL,
    PRIMARY KEY ("nombreProcedimiento", "IDReservacion")
);

--9.Crear tabla Procedimientos

CREATE TABLE "Procedimientos" (
    nombre TEXT NOT NULL PRIMARY KEY,
    "diasRecuperacion" INTEGER NOT NULL
);

--10.Crear tabla Reservacion

CREATE TABLE "Reservacion" (
    "IDReservacion" SERIAL NOT NULL PRIMARY KEY,
    "cedulaPaciente" INTEGER NOT NULL,
    "numCama" INTEGER NOT NULL,
    "fechaIngreso" DATE NOT NULL,
    procedimiento TEXT NOT NULL,
    "nombrePaciente" TEXT NOT NULL,
    "fechaSalida" DATE NOT NULL
);

--11.Crear tabla Rol

CREATE TABLE "Rol" (
    id INTEGER NOT NULL PRIMARY KEY,
    nombre TEXT NOT NULL
);

--12.Crear tabla Salones

CREATE TABLE "Salones" (
    "numSalon" INTEGER NOT NULL PRIMARY KEY,
    "nombreSalon" TEXT NOT NULL,
    capacidad INTEGER NOT NULL,
    piso TEXT NOT NULL,
    genero TEXT NOT NULL
);

--Añadir llaves foráneas al final

ALTER TABLE "Camas"
    ADD CONSTRAINT fk_salon FOREIGN KEY (salon) REFERENCES "Salones"("numSalon");

ALTER TABLE "EquipoPorCama"
    ADD CONSTRAINT fk_numCama FOREIGN KEY ("numCama") REFERENCES "Camas"("numeroCama"),
    ADD CONSTRAINT fk_equipo FOREIGN KEY (equipo) REFERENCES "EquipoMedico"(nombre);

ALTER TABLE "HistorialClinico"
    ADD CONSTRAINT fk_cedulaPaciente FOREIGN KEY ("cedulaPaciente") REFERENCES "Paciente"(cedula),

ALTER TABLE "Personal"
    ADD CONSTRAINT fk_rol FOREIGN KEY (rol) REFERENCES "Rol"(id);

ALTER TABLE "ProcedimientoPorReservacion"
    ADD CONSTRAINT fk_procedimiento FOREIGN KEY ("nombreProcedimiento") REFERENCES "Procedimientos"(nombre),
    ADD CONSTRAINT fk_reservacion FOREIGN KEY ("IDReservacion") REFERENCES "Reservacion"("idReservacion");

ALTER TABLE "Reservacion"
    ADD CONSTRAINT fk_cedulaPaciente_reservacion FOREIGN KEY ("cedulaPaciente") REFERENCES "Paciente"(cedula),
    ADD CONSTRAINT fk_numCama_reservacion FOREIGN KEY ("numCama") REFERENCES "Camas"("numeroCama"),
    ADD CONSTRAINT fk_procedimiento_reservacion FOREIGN KEY (procedimiento) REFERENCES "Procedimientos"(nombre);

ALTER TABLE PatologiasPorPaciente
    ADD CONSTRAINT fk_cedula_paciente FOREIGN KEY (cedula) REFERENCES Paciente(cedula);
