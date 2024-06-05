--1.LOGIN PACIENTE
CREATE OR REPLACE FUNCTION loginpaciente(
    p_cedula INTEGER,
    p_contraseña TEXT
)
RETURNS TABLE (
    "cedula" INTEGER,
    "telefono" TEXT,
    "nombre" TEXT,
    "apellido1" TEXT,
    "apellido2" TEXT,
    "direccion" TEXT,
    "fechaNacimiento" DATE,
    "contraseña" TEXT,
    "patologias" TEXT[],
    "tratamiento" TEXT[]
) LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT p."cedula", p."telefono", p."nombre", p."apellido1", p."apellido2", p."direccion", 
           p."fechaNacimiento", p."contraseña",
           ARRAY_AGG(pp."nombrePatologia") AS "patologias",
           ARRAY_AGG(pp."tratamientoPatologia") AS "tratamiento"
    FROM "Paciente" p
    LEFT JOIN "PatologiasPorPaciente" pp ON p."cedula" = pp."cedula"
    WHERE p."cedula" = p_cedula AND p."contraseña" = p_contraseña
    GROUP BY p."cedula", p."telefono", p."nombre", p."apellido1", p."apellido2", p."direccion", p."fechaNacimiento", p."contraseña";

    -- Si no hay coincidencias, retornar conjunto vacío
    IF NOT FOUND THEN
        RETURN QUERY SELECT NULL::INTEGER, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::DATE, NULL::TEXT, NULL::TEXT[], NULL::TEXT[] WHERE FALSE;
    END IF;
END;
$$;


--2.LOGIN PERSONAL

CREATE OR REPLACE FUNCTION log_in_personal(
    p_cedula INTEGER,
    p_contraseña TEXT
)
RETURNS TABLE (
    cedula INTEGER,
    telefono TEXT,
    nombre TEXT,
    apellido1 TEXT,
    apellido2 TEXT,
    direccion TEXT,
    rol INTEGER,
    "fechaNacimiento" DATE,
    "fechaIngreso" DATE,
    "contraseña" TEXT
) LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM "Personal"
    WHERE cedula = p_cedula AND "contraseña" = p_contraseña;

    -- Si no hay coincidencias, retornar conjunto vacío
    IF NOT FOUND THEN
        RETURN QUERY SELECT NULL::INTEGER, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::INTEGER, NULL::DATE, NULL::DATE, NULL::TEXT WHERE FALSE;
    END IF;
END;
$$;

--3.OBTENER EQUIPO MÉDICO

CREATE OR REPLACE FUNCTION obtenerEquiposMedicos()
RETURNS TABLE (
    nombre TEXT,
    proveedor TEXT,
    cantidad INTEGER
)
AS $$
BEGIN
    RETURN QUERY
    SELECT em."nombre", em."proveedor", em."cantidad"
    FROM "EquipoMedico" em;
END;
$$ LANGUAGE plpgsql;


--4.OBTENER HISTORIAL CLINICO

CREATE OR REPLACE FUNCTION obtenerHistorialClinico(
    IN p_cedulaPaciente INTEGER
)
RETURNS TABLE(
    "cedulaPaciente" INTEGER,
    "fechaProcedimiento" DATE,
    tratamiento TEXT,
    procedimiento TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT "cedulaPaciente", "fechaProcedimiento", tratamiento, procedimiento
    FROM "HistorialClinico"
    WHERE "cedulaPaciente" = p_cedulaPaciente;
END;
$$;


--5.OBTENER PROCEDIMIENTOS

CREATE OR REPLACE FUNCTION obtenerProcedimientos()
RETURNS TABLE (
    nombre_procedimiento TEXT,
    dias_recuperacion INTEGER
)
AS $$
BEGIN
    RETURN QUERY
    SELECT p."nombre", p."diasRecuperacion"
    FROM "Procedimientos" p;
END;
$$ LANGUAGE plpgsql;


--6.OBTENER RESERVACIONES POR CEDULAS

CREATE OR REPLACE FUNCTION obtenerReservacionesPorCedula(
    p_cedula INTEGER
)
RETURNS TABLE (
    IDReservacion INTEGER,
    numCama INTEGER,
    fechaIngreso DATE,
    nombrePaciente TEXT,
    procedimientos TEXT[]
)
AS $$
BEGIN
    RETURN QUERY
    SELECT r."idReservacion", r."numCama", r."fechaIngreso", r."nombrePaciente", ARRAY_AGG(pr."nombreProcedimiento")
    FROM "Reservacion" r
    LEFT JOIN "ProcedimientoPorReservacion" pr ON r."idReservacion" = pr."IDReservacion"
    WHERE r."cedulaPaciente" = p_cedula
    GROUP BY r."idReservacion";
END;
$$ LANGUAGE plpgsql;


--7.OBTENER TODAS LAS CAMAS

CREATE OR REPLACE FUNCTION obtenerTodasLasCamas()
RETURNS TABLE (
    numeroCama INTEGER,
    camaUCI BOOLEAN,
    salon INTEGER,
    equipos TEXT[]
)
AS $$
BEGIN
    RETURN QUERY
    SELECT c."numeroCama", c."camaUCI", c."salon", COALESCE(ARRAY_AGG(em."nombre"), '{}')
    FROM "Camas" c
    LEFT JOIN "EquipoPorCama" epc ON c."numeroCama" = epc."numCama"
    LEFT JOIN "EquipoMedico" em ON epc."equipo" = em."nombre"
    GROUP BY c."numeroCama", c."camaUCI", c."salon";
END;
$$ LANGUAGE plpgsql;


--8.OBTENER TODAS LAS RESERVACIONES

CREATE OR REPLACE FUNCTION obtenerTodasLasReservaciones()
RETURNS TABLE (
    IDReservacion INTEGER,
    numCama INTEGER,
    fechaIngreso DATE,
    nombrePaciente TEXT,
    procedimientos TEXT[]
)
AS $$
BEGIN
    RETURN QUERY
    SELECT r."idReservacion", r."numCama", r."fechaIngreso", r."nombrePaciente", COALESCE(ARRAY_AGG(pr."nombreProcedimiento"), '{}')
    FROM "Reservacion" r
    LEFT JOIN "ProcedimientoPorReservacion" pr ON r."idReservacion" = pr."IDReservacion"
    GROUP BY r."idReservacion";
END;
$$ LANGUAGE plpgsql;


--9.OBTENER TODO EL PERSONAL

CREATE OR REPLACE FUNCTION obtenerTodoPersonal()
RETURNS TABLE(
    "cedula" INTEGER,
    "telefono" TEXT,
    "nombre" TEXT,
    "apellido1" TEXT,
    "apellido2" TEXT,
    "direccion" TEXT,
    "rol" INTEGER,
    "fechaNacimiento" DATE,
    "fechaIngreso" DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT p."cedula", p."telefono", p."nombre", p."apellido1", p."apellido2", p."direccion", p."rol", p."fechaNacimiento", p."fechaIngreso"
    FROM "Personal" p;
END;
$$;
--10. OBTENER TODOS LOS PACIENTES

CREATE OR REPLACE FUNCTION obtenerTodosPacientes()
RETURNS TABLE(
    "cedula" INTEGER,
    "telefono" TEXT,
    "nombre" TEXT,
    "apellido1" TEXT,
    "apellido2" TEXT,
    "direccion" TEXT,
    "fechaNacimiento" DATE,
    "patologias" TEXT[],
    "tratamientos" TEXT[]
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT p."cedula", p."telefono", p."nombre", p."apellido1", p."apellido2", p."direccion", p."fechaNacimiento", 
           ARRAY_AGG(pp."nombrePatologia") AS "patologias",
           ARRAY_AGG(pp."tratamientoPatologia") AS "tratamientos"
    FROM "Paciente" p
    LEFT JOIN "PatologiasPorPaciente" pp ON p."cedula" = pp."cedula"
    GROUP BY p."cedula", p."telefono", p."nombre", p."apellido1", p."apellido2", p."direccion";
END;
$$;




