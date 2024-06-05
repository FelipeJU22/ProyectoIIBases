using HospiTEC_MODEL;
using HospiTEC_MODEL.DTOs;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HospiTEC_DAL
{
    public class ReservacionDAL
    {
        private readonly IConfiguration _configuration;

        public ReservacionDAL(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void VerficarReservacion(ReservacionDTO reservacion)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "verificarreservacion";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("p_cedulapaciente", reservacion.cedulaPaciente);
                        comando.Parameters.AddWithValue("p_fechaingreso",  DateOnly.Parse(reservacion.fechaIngreso));
                        comando.Parameters.AddWithValue("p_fechasalida", DateOnly.Parse(reservacion.fechaSalida));
                        comando.Parameters.AddWithValue("p_nombrepaciente", reservacion.nombrePaciente);
                        comando.Parameters.AddWithValue("p_procedimientos", reservacion.procedimientos);

                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<ReservacionID>GetReservacionesCedula(int cedulaPaciente)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string query = "SELECT * FROM obtenerreservacionesporcedula(@p_cedula)";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(query, conexion))
                    {
                        comando.Parameters.AddWithValue("p_cedula", cedulaPaciente);

                        using (var reader = comando.ExecuteReader())
                        {
                            var reservaciones = new List<ReservacionID>();

                            while (reader.Read())
                            {
                                var reservacion = new ReservacionID
                                {
                                    ID = reader.GetInt32(0),
                                    numeroCama = reader.GetInt32(1),
                                    fechaIngreso = Convert.ToDateTime(reader.GetDateTime(2)).ToString("yyyy-MM-dd"),
                                    nombrePaciente = reader.GetString(3),
                                    procedimientos = (reader["procedimientos"] as object[]).Cast<string>().ToList()
                                };

                                reservaciones.Add(reservacion);
                            }
                            return reservaciones;
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ReservacionID> GetAllReservaciones()
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string query = @"SELECT * FROM obtenertodaslasreservaciones()";

            var reservaciones = new List<ReservacionID>();

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();
                    using (NpgsqlCommand comando = new NpgsqlCommand(query, conexion))
                    {
                        using (IDataReader respuesta = comando.ExecuteReader())
                        {
                            while (respuesta.Read())
                            {
                                ReservacionID reservacion = new ReservacionID()
                                {
                                    ID = respuesta.GetInt32(0),
                                    numeroCama = respuesta.GetInt32(1),
                                    fechaIngreso = Convert.ToDateTime(respuesta.GetDateTime(2)).ToString("yyyy-MM-dd"),
                                    nombrePaciente = respuesta.GetString(3),
                                    procedimientos = (respuesta["procedimientos"] as object[]).Cast<string>().ToList()
                                };

                                reservaciones.Add(reservacion);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return reservaciones;
        }


        public void EliminarReservacion(int ID)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "eliminarreservacion";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("p_idreservacion", ID);
                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void ModificarReservacion(ReservacionModificar reservacion)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "modificarreservacion";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("p_idreservacion", reservacion.ID);
                        comando.Parameters.AddWithValue("p_cedulapaciente", reservacion.CedulaPaciente);
                        comando.Parameters.AddWithValue("p_numcama", reservacion.NumeroCama);
                        comando.Parameters.AddWithValue("p_fechaingreso", DateOnly.Parse(reservacion.FechaIngreso));
                        comando.Parameters.AddWithValue("p_fechasalida", DateOnly.Parse(reservacion.FechaSalida));
                        comando.Parameters.AddWithValue("p_nombrepaciente", reservacion.NombrePaciente);
                        comando.Parameters.AddWithValue("p_procedimientos", reservacion.Procedimientos);
                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
