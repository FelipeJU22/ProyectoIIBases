--1.AÑADIR HISTORIAL CLÍNICO

CREATE OR REPLACE PROCEDURE añadirHistorialClinico(
    IN p_cedulaPaciente INTEGER,
    IN p_fechaProcedimiento DATE,
    IN p_tratamiento TEXT[],
    IN p_procedimiento TEXT[]
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insertar el nuevo historial clínico sin verificaciones
    INSERT INTO HistorialClinico ("cedulaPaciente", "fechaProcedimiento", tratamiento, procedimiento)
    VALUES (p_cedulaPaciente, p_fechaProcedimiento, p_tratamiento, p_procedimiento);

END;
$$;


--2.CREAR CAMA

CREATE OR REPLACE PROCEDURE crearCama(
    IN p_numeroCama integer,
    IN p_equiposMedicos TEXT[],  -- Usamos un array de TEXT para los equipos médicos
    IN p_salon integer,
    IN p_camaUCI boolean
)
LANGUAGE plpgsql
AS $$
DECLARE
    equipo TEXT;  -- Variable para almacenar cada equipo médico del array
BEGIN
    -- Insertar la cama en la tabla "Camas"
    INSERT INTO "Camas" ("numeroCama", salon, "camaUCI")
    VALUES (p_numeroCama, p_salon, p_camaUCI);

    -- Insertar los equipos médicos en la tabla "EquipoPorCama"
    FOREACH equipo IN ARRAY p_equiposMedicos
    LOOP
        INSERT INTO "EquipoPorCama" ("numCama", "equipo")
        VALUES (p_numeroCama, equipo);
    END LOOP;
END;
$$;


--3.CREAR EQUIPO MÉDICO

CREATE OR REPLACE PROCEDURE crearEquipoMedico(
    IN p_nombre TEXT,
    IN p_proveedor TEXT,
    IN p_cantidad INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insertar el nuevo equipo médico
    INSERT INTO "EquipoMedico" (nombre, proveedor, cantidad)
    VALUES (p_nombre, p_proveedor, p_cantidad);
    
    RAISE NOTICE 'Equipo médico añadido correctamente con nombre %', p_nombre;
END;
$$;


--4.CREAR PACIENTE

CREATE OR REPLACE PROCEDURE crearPaciente(
    IN p_cedula INTEGER,
    IN p_telefono TEXT,
    IN p_nombre TEXT,
    IN p_apellido1 TEXT,
    IN p_apellido2 TEXT,
    IN p_direccion TEXT,
    IN p_patologias TEXT[],
    IN p_tratPatologia TEXT[],
    IN p_fechaNacimiento DATE,
    IN p_contraseña TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    i INTEGER;
BEGIN
    -- Insertar el nuevo paciente
    INSERT INTO "Paciente" ("cedula", "telefono", "nombre", "apellido1", "apellido2", "direccion", "fechaNacimiento", "contraseña")
    VALUES (p_cedula, p_telefono, p_nombre, p_apellido1, p_apellido2, p_direccion, p_fechaNacimiento, p_contraseña);

    -- Verificar que las listas de patologías y tratamientos no sean nulas, no estén vacías, no contengan 'Null'
    IF p_patologias IS NOT NULL 
       AND p_tratPatologia IS NOT NULL 
       AND array_length(p_patologias, 1) IS NOT NULL 
       AND array_length(p_tratPatologia, 1) IS NOT NULL 
       AND NOT (p_patologias = ARRAY['Null'] AND p_tratPatologia = ARRAY['Null']) THEN
        FOR i IN 1..array_length(p_patologias, 1) LOOP
            INSERT INTO "PatologiasPorPaciente" ("nombrePatologia", "tratamientoPatologia", "cedula")
            VALUES (p_patologias[i], p_tratPatologia[i], p_cedula);
        END LOOP;
    END IF;
END;
$$;


--5.CREAR PERSONAL

CREATE OR REPLACE PROCEDURE crearPersonal(
    IN p_cedula INTEGER,
    IN p_telefono TEXT,
    IN p_nombre TEXT,
    IN p_apellido1 TEXT,
    IN p_apellido2 TEXT,
    IN p_direccion TEXT,
    IN p_rol INTEGER,
    IN p_fechaNacimiento DATE,
    IN p_fechaIngreso DATE,
    IN p_contraseña TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insertar el nuevo personal
    INSERT INTO "Personal" ("cedula", "telefono", "nombre", "apellido1", "apellido2", "direccion", "rol", "fechaNacimiento", "fechaIngreso")
    VALUES (p_cedula, p_telefono, p_nombre, p_apellido1, p_apellido2, p_direccion, p_rol, p_fechaNacimiento, p_fechaIngreso);
END;
$$;


--6.CREAR PROCEDIMIENTO

CREATE OR REPLACE PROCEDURE crearProcedimiento(
    IN p_nombre TEXT,
    IN p_diasRecuperacion INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insertar el nuevo procedimiento
    INSERT INTO "Procedimientos" (nombre, "diasRecuperacion")
    VALUES (p_nombre, p_diasRecuperacion);
END;
$$;


--7.CREAR RESERVACION

CREATE OR REPLACE PROCEDURE crearReservacion(
    IN p_cedulaPaciente INTEGER,
    IN p_numCama INTEGER,
    IN p_fechaIngreso DATE,
    IN p_nombrePaciente TEXT,
    IN p_procedimientos TEXT[]
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_IDReservacion INTEGER;
    proc TEXT;
BEGIN
    -- Insertar la reservación en la tabla Reservacion
    INSERT INTO public."Reservacion" ("cedulaPaciente", "numCama", "fechaIngreso", "nombrePaciente")
    VALUES (p_cedulaPaciente, p_numCama, p_fechaIngreso, p_nombrePaciente)
    RETURNING "idReservacion" INTO v_IDReservacion;

    -- Insertar los procedimientos en la tabla ProcedimientoPorReservacion
    FOREACH proc IN ARRAY p_procedimientos
    LOOP
        INSERT INTO public."ProcedimientoPorReservacion" ("nombreProcedimiento", "IDReservacion")
        VALUES (proc, v_IDReservacion);
    END LOOP;
END;
$$;


--8.CREAR SALÓN

CREATE OR REPLACE PROCEDURE crearSalon(
    IN p_numSalon INTEGER,
    IN p_nombreSalon TEXT,
    IN p_capacidad INTEGER,
    IN p_piso TEXT,
    IN p_genero TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insertar el nuevo salón
    INSERT INTO "Salones" ("numSalon", "nombreSalon", capacidad, piso, genero)
    VALUES (p_numSalon, p_nombreSalon, p_capacidad, p_piso, p_genero);
END;
$$;

--9.ELIMINAR PERSONAL

CREATE OR REPLACE PROCEDURE eliminarPersonal(
    IN p_cedula INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Eliminar el personal por cédula
    DELETE FROM "Personal"
    WHERE "cedula" = p_cedula;
END;
$$;


--10.ELIMINAR RESERVACIÓN

CREATE OR REPLACE PROCEDURE eliminarReservacion(
    IN p_IDReservacion INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_numCama INTEGER;
BEGIN
    
    -- Eliminar los procedimientos asociados a la reservación
    DELETE FROM "ProcedimientoPorReservacion"
    WHERE "IDReservacion" = p_IDReservacion;

    -- Eliminar la reservación
    DELETE FROM "Reservacion"
    WHERE "idReservacion" = p_IDReservacion;
END;



--11.ELIMINAR SALÓN

CREATE OR REPLACE PROCEDURE eliminarSalon(
    IN p_numSalon INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Establecer el atributo salón de las camas como NULL
    UPDATE "Camas"
    SET "salon" = NULL
    WHERE "salon" = p_numSalon;
    
    -- Eliminar el salón por número de salón
    DELETE FROM "Salones"
    WHERE "numSalon" = p_numSalon;
END;
$$;


--12.MODIFICAR RESERVACION

CREATE OR REPLACE PROCEDURE modificar_reservacion(
    IN p_IDReservacion INTEGER,
    IN p_cedulaPaciente INTEGER,
    IN p_numCama INTEGER,
    IN p_fechaIngreso DATE,
    IN p_fechaSalida DATE,
    IN p_nombrePaciente TEXT,
    IN p_procedimientos TEXT[]
)
LANGUAGE plpgsql
AS $$
DECLARE
    proc TEXT;
BEGIN
    -- Actualizar la información de la reservación en la tabla Reservacion
    UPDATE public."Reservacion"
    SET "cedulaPaciente" = p_cedulaPaciente,
        "numCama" = p_numCama,
        "fechaIngreso" = p_fechaIngreso,
		"fechaSalida" = p_fechaSalida,
        "nombrePaciente" = p_nombrePaciente
    WHERE "idReservacion" = p_IDReservacion;

    -- Eliminar los procedimientos asociados a la reservación
    DELETE FROM public."ProcedimientoPorReservacion"
    WHERE "IDReservacion" = p_IDReservacion;

    -- Insertar los nuevos procedimientos en la tabla ProcedimientoPorReservacion
    FOREACH proc IN ARRAY p_procedimientos
    LOOP
        INSERT INTO public."ProcedimientoPorReservacion" ("nombreProcedimiento", "IDReservacion")
        VALUES (proc, p_IDReservacion);
    END LOOP;
END;
$$;


--13.MODIFICAR CAMA
CREATE OR REPLACE PROCEDURE modificarCama(
    IN p_numeroCama integer,
    IN p_equiposMedicos TEXT[],  -- Usamos un array de TEXT para los equipos médicos
    IN p_salon integer,
    IN p_camaUCI boolean
)
LANGUAGE plpgsql
AS $$
DECLARE
    equipo TEXT;
BEGIN
    -- Actualizar la cama en la tabla "Camas"
    UPDATE "Camas"
    SET salon = p_salon,
        "camaUCI" = p_camaUCI
    WHERE "numeroCama" = p_numeroCama;

    -- Eliminar los equipos médicos antiguos de la tabla "EquipoPorCama"
    DELETE FROM "EquipoPorCama"
    WHERE "numCama" = p_numeroCama;

    -- Insertar los nuevos equipos médicos en la tabla "EquipoPorCama"
    FOREACH equipo IN ARRAY p_equiposMedicos
    LOOP
        INSERT INTO "EquipoPorCama" ("numCama", equipo)
        VALUES (p_numeroCama, equipo);
    END LOOP;
END;
$$;


--14.MODIFICAR EQUIPO MÉDICO

CREATE OR REPLACE PROCEDURE modificarEquipoMedico(
    IN p_nombre TEXT,
    IN p_proveedor TEXT,
    IN p_cantidad INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Actualizar el equipo médico
    UPDATE "EquipoMedico"
    SET proveedor = p_proveedor,
        cantidad = p_cantidad
    WHERE nombre = p_nombre;
END;
$$;


--15.MODIFICAR HISTORIAL CLÍNICO

CREATE OR REPLACE PROCEDURE modificarHistorialClinico(
    IN p_cedulaPaciente INTEGER,
    IN p_fechaProcedimiento DATE,
    IN p_tratamiento TEXT[],
    IN p_procedimiento TEXT[]
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Actualizar el historial clínico
    UPDATE "HistorialClinico"
    SET tratamiento = p_tratamiento,
        procedimiento = p_procedimiento
    WHERE "cedulaPaciente" = p_cedulaPaciente
      AND "fechaProcedimiento" = p_fechaProcedimiento;
    
    -- Verificar si se actualizó alguna fila
    IF NOT FOUND THEN
        RAISE NOTICE 'No se encontró el historial clínico para el paciente con cédula % y fecha %', p_cedulaPaciente, p_fechaProcedimiento;
    END IF;
END;
$$;



--16.MODIFICAR PERSONAL

CREATE OR REPLACE PROCEDURE modificarPersonal(
    IN p_cedula INTEGER,
    IN p_telefono TEXT,
    IN p_nombre TEXT,
    IN p_apellido1 TEXT,
    IN p_apellido2 TEXT,
    IN p_direccion TEXT,
    IN p_rol INTEGER,
    IN p_fechaNacimiento DATE,
    IN p_fechaIngreso DATE,
    IN p_contraseña TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Actualizar el personal
    UPDATE "Personal"
    SET "telefono" = p_telefono,
        "nombre" = p_nombre,
        "apellido1" = p_apellido1,
        "apellido2" = p_apellido2,
        "direccion" = p_direccion,
        "rol" = p_rol,
        "fechaNacimiento" = p_fechaNacimiento,
        "fechaIngreso" = p_fechaIngreso,
        "contraseña" = p_contraseña
    WHERE "cedula" = p_cedula;
END;
$$;


--17.MODIFICAR PROCEDIMIENTO

CREATE OR REPLACE PROCEDURE modificarProcedimiento(
    IN p_nombre TEXT,
    IN p_diasRecuperacion INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Actualizar el procedimiento
    UPDATE "Procedimientos"
    SET "diasRecuperacion" = p_diasRecuperacion
    WHERE nombre = p_nombre;
END;
$$;


--18.MODIFICAR SALÓN

CREATE OR REPLACE PROCEDURE modificarSalon(
    IN p_numSalon INTEGER,
    IN p_nombreSalon TEXT,
    IN p_capacidad INTEGER,
    IN p_piso TEXT,
    IN p_genero TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Actualizar el salón
    UPDATE "Salones"
    SET "nombreSalon" = p_nombreSalon,
        capacidad = p_capacidad,
        piso = p_piso,
        genero = p_genero
    WHERE "numSalon" = p_numSalon;
END;
$$;


--19.VERIFICAR RESERVACIÓN

CREATE OR REPLACE PROCEDURE verificarreservacion(
    IN p_cedulaPaciente INTEGER,
    IN p_fechaIngreso DATE,
    IN p_fechaSalida DATE,
    IN p_nombrePaciente TEXT,
    IN p_procedimientos TEXT[]
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_numCama INTEGER;
BEGIN
    -- Encontrar una cama disponible
    SELECT c."numeroCama"
    INTO v_numCama
    FROM "Camas" c
    WHERE NOT EXISTS (
        SELECT 1
        FROM "Reservacion" r
        WHERE c."numeroCama" = r."numCama"
        AND r."fechaIngreso" < p_fechaSalida
        AND r."fechaSalida" > p_fechaIngreso
    )
    LIMIT 1;

    -- Si no se encuentra una cama disponible, lanzar un error
    IF v_numCama IS NULL THEN
        RAISE EXCEPTION 'No hay camas disponibles para las fechas especificadas';
    END IF;

    -- Llamar al procedimiento para insertar la reservación y los procedimientos
    CALL crearreservacion(p_cedulaPaciente, v_numCama, p_fechaIngreso, p_fechaSalida, p_nombrePaciente, p_procedimientos);
END;
$$;

