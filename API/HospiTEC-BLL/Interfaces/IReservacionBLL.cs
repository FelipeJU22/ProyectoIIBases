using HospiTEC_MODEL;
using HospiTEC_MODEL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Interfaces
{
    public interface IReservacionBLL
    {
        public void VerficarReservacionBLL(ReservacionDTO reservacion);
        public List<ReservacionID> GetReservacionesCedulaBLL(int cedulaPaciente);
        public List<ReservacionID> GetAllReservacionesBLL();
        public void EliminarReservacionBLL(int ID);
        public void ModificarReservacionBLL(ReservacionModificar reservacion);

    }
}
