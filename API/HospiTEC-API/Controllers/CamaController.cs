using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_MODEL.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HospiTEC_API.Controllers
{
    [ApiController]
    [Route("HistorialClinico")]

    public class CamaController : Controller
    {
        private readonly ICamaBLL _camaBLL;

        public CamaController(ICamaBLL camaBLL)
        {
            _camaBLL = camaBLL;
        }

        /// <summary>
        /// Crea una nueva cama
        /// </summary>
        /// <param name="cama"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CrearCama")]
        public IActionResult CrearCama(CamaDTO cama)
        {
            try
            {
                _camaBLL.CrearCamaBLL(cama);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// Retorna la informacion de todas las camas
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllCamas")]
        public IActionResult GetAllCamas()
        {
            var resultado = _camaBLL.GetAllCamasBLL();
            return Ok(resultado);
        }

        /// <summary>
        /// Modifica todos los datos de una cama
        /// </summary>
        /// <param name="cama"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("ModificarCama")]
        public IActionResult ModificarCama(CamaDTO cama)
        {
            try
            {
                _camaBLL.ModificarCamaBLL(cama);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

    }
}
