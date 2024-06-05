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
    public class EquipoMedicoBLL : IEquipoMedicoBLL
    {
        private readonly IConfiguration _configuration;
        private readonly EquipoMedicoDAL _equipoMedicoDAL;

        public EquipoMedicoBLL(IConfiguration configuration, EquipoMedicoDAL equipoMedicoDAL)
        {
            _configuration = configuration;
            _equipoMedicoDAL = equipoMedicoDAL;
        }

        public void CrearEquipoMedicoBLL(EquipoMedicoDTO equipo)
        {
            try
            {
                _equipoMedicoDAL.CrearEquipoMedico(equipo);
            }
            catch
            {
                throw;
            }
        }

        public List<EquipoMedicoDTO> GetAllEquiposMedicosBLL()
        {
            try
            {
                var resultado = _equipoMedicoDAL.GetAllEquiposMedicos();

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void ModificarEquipoBLL(EquipoMedicoDTO equipo)
        {
            try
            {
                _equipoMedicoDAL.ModificarEquipo(equipo);
            }
            catch
            {
                throw;
            }
        }
    }
}
