using HospiTEC_BLL.Interfaces;
using HospiTEC_DAL;
using HospiTEC_MODEL;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Servicios
{
    public class MongoBLL : IMongoBLL
    {
        private readonly IConfiguration _configuration;
        private readonly MongoDAL _mongoDAL;

        public MongoBLL(IConfiguration configuration, MongoDAL mongoDAL)
        {
            _configuration = configuration;
            _mongoDAL = mongoDAL;
        }


        public void AgregarEvaluacionBLL(Evaluacion evaluacion)
        {
            try
            {
                _mongoDAL.AgregarEvaluacion(evaluacion);    
            }
            catch
            {
                throw;
            }
        }

        public List<Evaluacion> GetAllEvaluacionesBLL()
        {
            try
            {
                var resultado = _mongoDAL.GetAllEvaluaciones();

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
