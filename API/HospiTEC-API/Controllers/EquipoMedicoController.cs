using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_MODEL.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HospiTEC_API.Controllers
{
    [ApiController]
    [Route("EquipoMedico")]

    public class EquipoMedicoController : Controller
    {
        private readonly IEquipoMedicoBLL _equipoMedicoBLL;

        public EquipoMedicoController(IEquipoMedicoBLL equipoMedicoBLL)
        {
            _equipoMedicoBLL = equipoMedicoBLL;
        }

        /// <summary>
        /// Crear un nuevo equipo medico
        /// </summary>
        /// <param name="equipo"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CrearEquipoMedico")]
        public IActionResult CrearEquipoMedico(EquipoMedicoDTO equipo)
        {
            try
            {
                _equipoMedicoBLL.CrearEquipoMedicoBLL(equipo);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// retorna la informacion de todos los equipos medicos
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllEquipos")]
        public IActionResult GetAllEquipos()
        {
            var resultado = _equipoMedicoBLL.GetAllEquiposMedicosBLL();
            return Ok(resultado);
        }

        /// <summary>
        /// Modifica todos los datos de un equipo medico
        /// </summary>
        /// <param name="equipo"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("ModificarEquipoMedico")]
        public IActionResult ModificarEquipoMedico(EquipoMedicoDTO equipo)
        {
            try
            {
                _equipoMedicoBLL.ModificarEquipoBLL(equipo);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

    }
}
