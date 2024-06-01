--Script de populacion

-- Insertado de los roles en el hospital
INSERT INTO 
	public."Rol" ("ID", "nombre") 
VALUES 
	(1, 'Doctor'),
	(2, 'Enfermero'),
	(3, 'Administrador');

-- Insertado del equipo medico del hospital
INSERT INTO 
	public."EquipoMedico" ("nombre", "proveedor", "cantidad") 
VALUES
	('luces quirúrgicas', 'Proveedor A', 30),
	('ultrasonidos', 'Proveedor B', 20),
	('esterilizadores', 'Proveedor C', 40),
	('desfibriladores', 'Proveedor E', 60),
	('monitores', 'DELL', 180),
	('Respiradores Artificiales', 'Proveedor F', 100),
	('electrocardiógrafos', 'Proveedor G', 50);

-- Insertado de los Procedimientos medicos
INSERT INTO
	public."Procedimientos" ("nombre", "diasRecuperacion")
VALUES
	('Apendicectomía', 10),
	('Biopsia de mama', 5),
	('Cirugía de cataratas', 5),
	('Cesárea', 10),
	('Histerectomía', 15),
	('Cirugía para la lumbalgia', 10),
	('Mastectomía', 5),
	('Amigdalectomía', 3)

-- Insertado de los salones
INSERT INTO 
	public."Salones" ("numSalon", "nombreSalon", "capacidad", "piso", "genero")
VALUES
	(101, 'SALA A', 30, 'Piso 1', 'M'),
	(102, 'SALA B', 20, 'Piso 2', 'F'),
	(103, 'SALA C', 30, 'Piso 3', 'M'),
	(104, 'SALA D', 40, 'Piso 4', 'F');

-- Insertado de las camas
INSERT INTO
	public."Camas" ("numeroCama", "camaUCI" , "salon")
VALUES
	(1, false, 101)
	(2, true, 101),
	(3, false, 102),
	(4, false, 103),
	(5, true, 104)

-- Insertado en el equipo de cada cama
INSERT INTO 
	public."EquipoPorCama" ("numCama", "equipo")
VALUES
	(1, 'desfibriladores')
	(2, 'luces quirúrgicas'),
	(2, 'Respiradores Artificiales'),
	(2, 'monitores'),
	(3, 'ultrasonidos'),
	(4, 'esterilizadores'),
	(5, 'luces quirúrgicas'),
	(5, 'Respiradores Artificiales'),
	(5, 'monitores');

-- Insertado del personal predeterminado
SELECT * FROM public."Personal"

INSERT INTO 
	public."Personal" (
	"cedula", 
	"telefono", 
	"nombre", 
	"apellido1", 
	"apellido2", 
	"direccion",
	"fechaNacimiento",
	"fechaIngreso",
	"rol"
)
VALUES
	(
	119200338, 
	61242138, 
	'Manuel', 
	'Alfaro', 
	'Mayorga', 
	'Residencial Sofia', 
	'10-11-2004', 
	'06-01-2022', 
	1
	),
	(
	219200338,
	84421816,
	'Manolito',
	'Brenes',
	'Sequeira',
	'La carpio',
	'10-11-1990',
	'06-01-2010',
	2
	),
	(
	520193830,
	22791832,
	'Beto',
	'Alpizar',
	'Figueres',
	'Escazu',
	'01-06-1970',
	'05-08-2005',
	3
	);
