using HospiTEC_MODEL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Interfaces
{
    public interface ICamaBLL
    {
        public void CrearCamaBLL(CamaDTO cama);
        public List<CamaDTO> GetAllCamasBLL();
        public void ModificarCamaBLL(CamaDTO cama);

    }
}
