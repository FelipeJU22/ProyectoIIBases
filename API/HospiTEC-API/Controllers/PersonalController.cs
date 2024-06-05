using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_MODEL;
using Microsoft.AspNetCore.Mvc;

namespace HospiTEC_API.Controllers
{
    [ApiController]
    [Route("Personal")]
    public class PersonalController : Controller
    {
        private readonly IPersonalBLL _personalBLL;

        public PersonalController(IPersonalBLL personalBLL)
        {
            _personalBLL = personalBLL;
        }

        /// <summary>
        /// Retorna la informacion de todo el personal
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllPersonal")]
        public IActionResult GetAllPersonal()
        {
            var resultado = _personalBLL.GetAllPersonalBLL();   
            return Ok(resultado);
        }

        /// <summary>
        /// Crear un nuevo personal
        /// </summary>
        /// <param name="personal"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CrearPersonal")]
        public IActionResult CrearPersonal(Personal personal)
        {
            try
            {
                _personalBLL.CrearPersonalBLL(personal);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// Elimina un personal
        /// </summary>
        /// <param name="cedula"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("EliminarPersonal")]
        public IActionResult EliminarPersonal(int cedula)
        {
            try
            {
                _personalBLL.EliminarPersonaBLL(cedula);    
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

        /// <summary>
        /// retorna la info de un personal por cedula y contraseña
        /// </summary>
        /// <param name="cedula"></param>
        /// <param name="contraseña"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("LoginPersonal")]
        public IActionResult LoginPersonal(int cedula, string contraseña)
        {
            var resultado = _personalBLL.LoginPersonalBLL(cedula, contraseña);
            return Ok(resultado);
        }

        /// <summary>
        /// Modifica todos los datos de un personal
        /// </summary>
        /// <param name="personal"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("ModificarPersonal")]
        public IActionResult ModificarPersonal(Personal personal)
        {
            try
            {
                _personalBLL.ModificarPersonalBLL(personal);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok();
        }

    }
}
