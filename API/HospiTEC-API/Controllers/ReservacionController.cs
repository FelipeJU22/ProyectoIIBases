using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_MODEL;
using HospiTEC_MODEL.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HospiTEC_API.Controllers
{
    [ApiController]
    [Route("Reservacion")]

    public class ReservacionController : Controller
    {
        private readonly IReservacionBLL _reservacionBLL;

        public ReservacionController(IReservacionBLL reservacionBLL)
        {
            _reservacionBLL = reservacionBLL
                ;
        }

        /// <summary>
        /// Verifica una reservacion
        /// </summary>
        /// <param name="reservacion"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("VerificarReservacion")]
        public IActionResult VerificarReservacion(ReservacionDTO reservacion)
        {
            try
            {
                _reservacionBLL.VerficarReservacionBLL(reservacion);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// Retorna las reservaciones de un cliente por su cedula
        /// </summary>
        /// <param name="cedula"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetReservacionesCedula")]
        public IActionResult GetReservacionesCedula(int cedula)
        {
            var resultado = _reservacionBLL.GetReservacionesCedulaBLL(cedula);
            return Ok(resultado);
        }

        /// <summary>
        /// Retorna la informacion de todas las reservaciones
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllReservaciones")]
        public IActionResult GetAllReservaciones()
        {
            var resultado = _reservacionBLL.GetAllReservacionesBLL();
            return Ok(resultado);
        }

        /// <summary>
        /// Elimina una reservacion
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("EliminarReservacion")]
        public IActionResult EliminarReservacion(int ID)
        {
            try
            {
                _reservacionBLL.EliminarReservacionBLL(ID);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();

        }

        /// <summary>
        /// Modifica todos los datos de una reservacion
        /// </summary>
        /// <param name="reservacion"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("ModificarReservacion")]
        public IActionResult ModificarReservacion(ReservacionModificar reservacion)
        {
            try
            {
                _reservacionBLL.ModificarReservacionBLL(reservacion);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();

        }

    }
}