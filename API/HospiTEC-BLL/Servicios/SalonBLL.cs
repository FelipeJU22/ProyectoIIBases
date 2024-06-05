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
    public class SalonBLL : ISalonBLL
    {
        private readonly IConfiguration _configuration;
        private readonly SalonDAL _salonDAL;

        public SalonBLL(IConfiguration configuration, SalonDAL salonDAL)
        {
            _configuration = configuration;
            _salonDAL = salonDAL;
        }
        public void CrearSalonBLL(Salon salon)
        {
            try
            {
                _salonDAL.CrearSalon(salon);
            }
            catch
            {
                throw;
            }
        }

        public void EliminarSalonBLL(int numeroSalon)
        {
            try
            {
                _salonDAL.EliminarSalon(numeroSalon);
            }
            catch
            {
                throw;
            }
        }

        public List<Salon> GetAllSalonBLL()
        {
            try
            {
                var resultado = _salonDAL.GetAllSalon();

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void ModificarSalonBLL(Salon salon)
        {
            try
            {
                _salonDAL.ModificarSalon(salon);  
            }
            catch
            {
                throw;
            }
        }
    }
}
