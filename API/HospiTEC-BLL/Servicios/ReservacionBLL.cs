using HospiTEC_BLL.Interfaces;
using HospiTEC_DAL;
using HospiTEC_MODEL;
using HospiTEC_MODEL.DTOs;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Servicios
{
    public class ReservacionBLL : IReservacionBLL
    {
        private readonly IConfiguration _configuration;
        private readonly ReservacionDAL _reservacionDAL;

        public ReservacionBLL(IConfiguration configuration, ReservacionDAL reservacionDAL)
        {
            _configuration = configuration;
            _reservacionDAL = reservacionDAL;
        }

        public void EliminarReservacionBLL(int ID)
        {
            try
            {
                _reservacionDAL.EliminarReservacion(ID);
            }
            catch
            {
                throw;
            }
        }

        public List<ReservacionID> GetAllReservacionesBLL()
        {
            try
            {
                var resultado = _reservacionDAL.GetAllReservaciones();

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<ReservacionID> GetReservacionesCedulaBLL(int cedulaPaciente)
        {
            try
            {
                var resultado = _reservacionDAL.GetReservacionesCedula(cedulaPaciente);

                if (resultado == null)
                    return null;

                return resultado;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void ModificarReservacionBLL(ReservacionModificar reservacion)
        {
            try
            {
                _reservacionDAL.ModificarReservacion(reservacion);
            }
            catch
            {
                throw;
            }
        }

        public void VerficarReservacionBLL(ReservacionDTO reservacion)
        {
            try
            {
                _reservacionDAL.VerficarReservacion(reservacion);
            }
            catch
            {
                throw;
            }
        }
    }
}
