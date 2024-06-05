using HospiTEC_MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Interfaces
{
    public interface ISalonBLL
    {
        public void CrearSalonBLL(Salon salon);
        public List<Salon> GetAllSalonBLL();
        public void EliminarSalonBLL(int numeroSalon);
        public void ModificarSalonBLL(Salon salon);

    }
}
