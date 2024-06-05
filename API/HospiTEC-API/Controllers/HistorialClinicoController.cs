using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_MODEL.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HospiTEC_API.Controllers
{
    [ApiController]
    [Route("HistorialClinico")]

    public class HistorialClinicoController : Controller
    {
        private readonly IHistorialClinicoBLL _historialClinicoBLL;

        public HistorialClinicoController(IHistorialClinicoBLL historialClinicoBLL)
        {
            _historialClinicoBLL = historialClinicoBLL;
        }

        /// <summary>
        /// Añade un historial clinico
        /// </summary>
        /// <param name="historial"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AñadirHistorialClinico")]
        public IActionResult AddHistorialClinico(HistorialClinicoDTO historial)
        {
            try
            {
                _historialClinicoBLL.AddHistorialClinicoBLL(historial);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// Obtiene el historial clinico de un cliente especifico
        /// </summary>
        /// <param name="cedula"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("ObtenerHistorialCliente")]
        public IActionResult ObtenerHistorialCliente(int cedula)
        {
            var resultado = _historialClinicoBLL.ObtenerHistorialClinicoBLL(cedula);
            return Ok(resultado);
        }

    }
}
