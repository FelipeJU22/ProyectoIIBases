--1.ACTUALIZAR CANTIDAD DE EQUIPO
 
CREATE OR REPLACE FUNCTION actualizarCantidadEquipo()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "EquipoMedico"
    SET "cantidad" = "cantidad" - 1
    WHERE "nombre" = NEW."equipo" AND "cantidad" > 0;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No hay suficiente equipo disponible: %', NEW."equipo";
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizarCantidadEquipo
BEFORE INSERT ON "EquipoPorCama"
FOR EACH ROW EXECUTE FUNCTION actualizarCantidadEquipo();

INSERT INTO public."EquipoPorCama" ("numCama", "equipo")
VALUES (1, 'monitores');

SELECT * FROM "EquipoMedico"

-- Trigger para actualizar la capacidad de salones
CREATE OR REPLACE FUNCTION actualizarCapacidadSalon()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public."Salones"
    SET "capacidad" = "capacidad" - 1
    WHERE "numSalon"= NEW."salon";

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizarCapacidadSalon
AFTER INSERT ON public."Camas"
FOR EACH ROW EXECUTE FUNCTION actualizarCapacidadSalon();

SELECT * FROM "Salones"

INSERT INTO "Camas" ("numeroCama", "camaUCI", "salon") VALUES (6, false, 101)