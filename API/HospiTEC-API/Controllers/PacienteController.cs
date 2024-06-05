using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_MODEL;
using HospiTEC_MODEL.DTOs;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using ExcelDataReader;
using System.Globalization;
namespace HospiTEC_API.Controllers
{
    [ApiController]
    [Route("Paciente")]

    public class PacienteController : Controller
    {
        private readonly IPacienteBLL _pacienteBLL;

        public PacienteController(IPacienteBLL pacienteBLL)
        {
            _pacienteBLL = pacienteBLL;
        }

        /// <summary>
        /// Retorna la informacion de todos los pacientes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllPaciente")]
        public IActionResult GetAllPaciente()
        {
            var resultado = _pacienteBLL.GetAllPacientesBLL();
            return Ok(resultado);
        }

        /// <summary>
        /// Crea un nuevo paciente
        /// </summary>
        /// <param name="paciente"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CrearPaciente")]
        public IActionResult CrearPaciente(Paciente paciente)
        {
            try
            {
                _pacienteBLL.CrearPacienteBLL(paciente);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// Retorna la info de un paciente por su cedula y contraseña
        /// </summary>
        /// <param name="cedula"></param>
        /// <param name="contraseña"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("LoginPaciente")]
        public IActionResult LoginPaciente(int cedula, string contraseña)
        {
            var resultado = _pacienteBLL.LoginPacienteBLL(cedula, contraseña);
            return Ok(resultado);
        }

        /// <summary>
        /// Carga el archivo xls de pacientes a la base
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CargarExcel")]
        public async Task<IActionResult> UploadExcel(IFormFile file)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            if (file == null || file.Length == 0)
            {
                return Ok();
            }

            var uploadDirectory = $"{Directory.GetCurrentDirectory()}\\wwwroot\\Uploads";
            Directory.CreateDirectory(uploadDirectory);

            var filePath = Path.Combine(uploadDirectory, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var excelData = new List<List<object>>();
            var cedulas = new HashSet<string>();

            using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read))
            using (var reader = ExcelReaderFactory.CreateReader(stream))
            {
                bool isFirstRow = true;
                do
                {
                    while (reader.Read())
                    {
                        if (isFirstRow)
                        {
                            isFirstRow = false;
                            continue;
                        }

                        if (reader.GetValue(1) == null)
                        {
                            break;
                        }

                        var cedulaParts = reader.GetValue(1).ToString().Split(new[] { ' ', '-' }, StringSplitOptions.RemoveEmptyEntries);
                        if (cedulas.Contains(cedulaParts[0]))
                        {
                            continue;
                        }
                        cedulas.Add(cedulaParts[0]);

                        var nombreParts = reader.GetValue(0).ToString().Split(new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries);
                        var primerNombre = nombreParts[0].Trim();
                        var apellido1 = nombreParts.Length >= 2 ? nombreParts[1].Trim() : "Invalid name";

                        DateTime.TryParseExact(reader.GetValue(2).ToString(), new[] { "dd/MM/yy", "MMM dd, yyyy", "MMM d, yyyy", "MM-dd-yy" }, new CultureInfo("en-US"), DateTimeStyles.None, out DateTime parsedFechaNacimiento);

                        var paciente = new Paciente
                        {
                            cedula = Convert.ToInt32(cedulaParts[0]),
                            telefono = reader.GetValue(4).ToString(),
                            nombre = primerNombre,
                            apellido1 = apellido1,
                            apellido2 = "Null",
                            direccion = reader.GetValue(3).ToString(),
                            patologias = new List<string> { "Null" },
                            tratPatologia = new List<string> { "Null" },
                            fechaNacimiento = parsedFechaNacimiento.ToString("yyyy-MM-dd"),
                            contraseña = "123"
                        };

                        _pacienteBLL.CrearPacienteBLL(paciente);
                    }
                } while (reader.NextResult());
            }

            return Ok();
        }
    }
}
