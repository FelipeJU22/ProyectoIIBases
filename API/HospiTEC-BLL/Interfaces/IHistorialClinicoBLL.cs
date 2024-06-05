using HospiTEC_MODEL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Interfaces
{
    public interface IHistorialClinicoBLL
    {
        public void AddHistorialClinicoBLL(HistorialClinicoDTO historial);
        public List<HistorialClinicoDTO> ObtenerHistorialClinicoBLL(int cedulaPaciente);

    }
}
