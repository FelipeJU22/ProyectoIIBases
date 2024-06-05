using HospiTEC_BLL.Interfaces;
using HospiTEC_DAL;
using HospiTEC_MODEL.DTOs;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Servicios
{
    public class HistorialClinicoBLL : IHistorialClinicoBLL
    {
        private readonly IConfiguration _configuration;
        private readonly HistorialClinicoDAL _historialClinicoDAL;

        public HistorialClinicoBLL(IConfiguration configuration, HistorialClinicoDAL historialClinicoDAL)
        {
            _configuration = configuration;
            _historialClinicoDAL = historialClinicoDAL;
        }


        public void AddHistorialClinicoBLL(HistorialClinicoDTO historial)
        {
            try
            {
                _historialClinicoDAL.AddHistorialClinico(historial);
            }
            catch
            {
                throw;
            }
        }

        public List<HistorialClinicoDTO> ObtenerHistorialClinicoBLL(int cedulaPaciente)
        {
            try
            {
                var resultado = _historialClinicoDAL.ObtenerHistorialClinico(cedulaPaciente);

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
