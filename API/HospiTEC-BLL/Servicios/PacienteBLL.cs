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
    public class PacienteBLL : IPacienteBLL
    {
        private readonly IConfiguration _configuration;
        private readonly PacienteDAL _pacienteDAL;

        public PacienteBLL(IConfiguration configuration, PacienteDAL pacienteDAL)
        {
            _configuration = configuration;
            _pacienteDAL = pacienteDAL;
        }

        public void CrearPacienteBLL(Paciente paciente)
        {
            try
            {
                _pacienteDAL.CrearPaciente(paciente);
            }
            catch
            {
                throw;
            }
        }

        public List<Paciente> GetAllPacientesBLL()
        {
            try
            {
                var resultado = _pacienteDAL.GetAllPacientes();

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Paciente LoginPacienteBLL(int cedula, string contraseña)
        {
            try
            {
                var resultado = _pacienteDAL.LoginPaciente(cedula, contraseña);

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
