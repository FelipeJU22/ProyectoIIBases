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
    public class PersonalBLL : IPersonalBLL
    {
        private readonly IConfiguration _configuration;
        private readonly PersonalDAL _personalDAL;

        public PersonalBLL(IConfiguration configuration, PersonalDAL personalDAL)
        {
            _configuration = configuration;
            _personalDAL = personalDAL;
        }

        public void CrearPersonalBLL(Personal personal)
        {
            try
            {
                _personalDAL.CrearPersonal(personal);
            }
            catch
            {
                throw;
            }
        }

        public void EliminarPersonaBLL(int cedula)
        {
            try
            {
                _personalDAL.EliminarPersonal(cedula);
            }
            catch
            {
                throw;
            }
        }

        public List<Personal> GetAllPersonalBLL()
        {
            try
            {
                var resultado = _personalDAL.GetAllPersonal();

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Personal LoginPersonalBLL(int cedula, string contraseña)
        {
            try
            {
                var resultado = _personalDAL.LoginPersonal(cedula, contraseña);

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void ModificarPersonalBLL(Personal personal)
        {
            try
            {
                _personalDAL.ModificarPersonal(personal);
            }
            catch
            {
                throw;
            }
        }
    }
}
