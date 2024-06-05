using HospiTEC_MODEL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Interfaces
{
    public interface IEquipoMedicoBLL
    {
        public void CrearEquipoMedicoBLL(EquipoMedicoDTO equipo);
        public List<EquipoMedicoDTO> GetAllEquiposMedicosBLL();
        public void ModificarEquipoBLL(EquipoMedicoDTO equipo);

    }
}
