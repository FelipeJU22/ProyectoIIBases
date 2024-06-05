using HospiTEC_BLL.Interfaces;
using HospiTEC_DAL;
using HospiTEC_MODEL.DTOs;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Servicios
{
    public class CamaBLL : ICamaBLL
    {
        private readonly IConfiguration _configuration;
        private readonly CamaDAL _camaDAL;

        public CamaBLL(IConfiguration configuration, CamaDAL camaDAL)
        {
            _configuration = configuration;
            _camaDAL = camaDAL;
        }

        public void CrearCamaBLL(CamaDTO cama)
        {
            try
            {
                _camaDAL.CrearCama(cama);
            }
            catch
            {
                throw;
            }
        }

        public List<CamaDTO> GetAllCamasBLL()
        {
            try
            {
                var resultado = _camaDAL.GetAllCamas();

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void ModificarCamaBLL(CamaDTO cama)
        {
            try
            {
                _camaDAL.ModificarCama(cama);
            }
            catch
            {
                throw;
            }
        }
    }
}
