using HospiTEC_MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Interfaces
{
    public interface IPersonalBLL
    {
        public List<Personal> GetAllPersonalBLL();
        public void CrearPersonalBLL(Personal personal);
        public void EliminarPersonaBLL(int cedula);
        public Personal LoginPersonalBLL(int cedula, string contraseña);
        public void ModificarPersonalBLL(Personal personal);

    }
}
