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
    public class ProcedimientoBLL :IProcedimientoBLL
    {
        private readonly IConfiguration _configuration;
        private readonly ProcedimientoDAL _procedimientoDAL;

        public ProcedimientoBLL(IConfiguration configuration, ProcedimientoDAL procedimientoDAL)
        {
            _configuration = configuration;
            _procedimientoDAL = procedimientoDAL;
        }

        public void CrearProcedimientoBLL(Procedimiento procedimiento)
        {
            try
            {
                _procedimientoDAL.CrearProcedimiento(procedimiento);
            }
            catch
            {
                throw;
            }
        }

        public List<Procedimiento> GetAllProcedimientosBLL()
        {
            try
            {
                var resultado = _procedimientoDAL.GetAllProcedimientos();

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void ModificarProcedimientoBLL(Procedimiento procedimiento)
        {
            try
            {
                _procedimientoDAL.ModificarProcedimiento(procedimiento);
            }
            catch
            {
                throw;
            }
        }
    }
}
