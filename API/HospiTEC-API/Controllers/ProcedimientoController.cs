using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_MODEL;
using Microsoft.AspNetCore.Mvc;

namespace HospiTEC_API.Controllers
{
    [ApiController]
    [Route("Procedimiento")]
    public class ProcedimientoController : Controller
    {
        private readonly IProcedimientoBLL _procedimientoBLL;

        public ProcedimientoController(IProcedimientoBLL procedimientoBLL)
        {
            _procedimientoBLL = procedimientoBLL;
        }

        /// <summary>
        /// Crea un nuevo procedimiento
        /// </summary>
        /// <param name="procedimiento"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CrearProcedimiento")]
        public IActionResult CrearProcedimiento(Procedimiento procedimiento)
        {
            try
            {
                _procedimientoBLL.CrearProcedimientoBLL(procedimiento);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// Retorna todos los procedimientos
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllProcedimientos")]
        public IActionResult GetAllProcedimientos()
        {
            var resultado = _procedimientoBLL.GetAllProcedimientosBLL();
            return Ok(resultado);
        }

        /// <summary>
        /// Modifica los datos de un procedimiento
        /// </summary>
        /// <param name="procedimiento"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("ModificarProcedimiento")]
        public IActionResult ModificarProcedimiento(Procedimiento procedimiento)
        {
            try
            {
                _procedimientoBLL.ModificarProcedimientoBLL(procedimiento);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

    }
}
