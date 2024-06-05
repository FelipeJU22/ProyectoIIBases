using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_MODEL;
using Microsoft.AspNetCore.Mvc;

namespace HospiTEC_API.Controllers
{
    [ApiController]
    [Route("Evaluacion")]
    public class ReporteController : Controller
    {
        private readonly IMongoBLL _mongoBLL;

        public ReporteController(IMongoBLL mongoBLL)
        {
            _mongoBLL = mongoBLL;
        }

        /// <summary>
        /// Agrega una evaluacion
        /// </summary>
        /// <param name="evaluacion"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AgregarEvaluacion")]
        public IActionResult AgregarEvaluacion(Evaluacion evaluacion)
        {
            _mongoBLL.AgregarEvaluacionBLL(evaluacion);
            return Ok();
        }

        /// <summary>
        /// Retorna todas las evaluaciones
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllEvaluaciones")]
        public IActionResult GetAllEvaluaciones()
        {
            var resultado = _mongoBLL.GetAllEvaluacionesBLL();
            return Ok(resultado);
        }

    }
}
