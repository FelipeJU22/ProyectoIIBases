using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_MODEL;
using HospiTEC_MODEL.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HospiTEC_API.Controllers
{
    [ApiController]
    [Route("Salon")]

    public class SalonController : Controller
    {
        private readonly ISalonBLL _salonBLL;

        public SalonController(ISalonBLL salonBLL)
        {
            _salonBLL = salonBLL;
        }

        /// <summary>
        /// Crea un nuevo salon
        /// </summary>
        /// <param name="historial"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CrearSalon")]
        public IActionResult CrearSalon(Salon salon)
        {
            try
            {
                _salonBLL.CrearSalonBLL(salon);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// Retorna todos los salones
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllSalones")]
        public IActionResult GetAllSalones()
        {
            var resultado = _salonBLL.GetAllSalonBLL();
            return Ok(resultado);
        }

        /// <summary>
        /// Elimina un salon por su numero
        /// </summary>
        /// <param name="numeroSalon"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("EliminarSalon")]
        public IActionResult EliminarSalon(int numeroSalon)
        {
            try
            {
                _salonBLL.EliminarSalonBLL(numeroSalon);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// Modifica los datos de un salon
        /// </summary>
        /// <param name="salon"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("ModificarSalon")]
        public IActionResult ModificarSalon(Salon salon)
        {
            try
            {
                _salonBLL.ModificarSalonBLL(salon);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

    }
}
