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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace HospiTEC_DAL
{
    public class HistorialClinicoDAL
    {
        private readonly IConfiguration _configuration;

        public HistorialClinicoDAL(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void AddHistorialClinico(HistorialClinicoDTO historial)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "añadirhistorialclinico";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("p_cedulapaciente", historial.cedulaPaciente);
                        comando.Parameters.AddWithValue("p_fechaprocedimiento", DateOnly.Parse(historial.fechaProcedimiento));
                        comando.Parameters.AddWithValue("p_tratamiento", historial.tratamiento);
                        comando.Parameters.AddWithValue("p_procedimiento", historial.procedimiento);

                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public List<HistorialClinicoDTO> ObtenerHistorialClinico(int cedulaPaciente)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string funcion = "SELECT * FROM obtenerhistorialclinico(@p_cedulapaciente)";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(funcion, conexion))
                    {
                        comando.Parameters.AddWithValue("p_cedulapaciente", cedulaPaciente);

                        using (var reader = comando.ExecuteReader())
                        {
                            var historialClinico = new List<HistorialClinicoDTO>();

                            while (reader.Read())
                            {
                                var registro = new HistorialClinicoDTO
                                {
                                    cedulaPaciente = reader.GetInt32(0),
                                    fechaProcedimiento = Convert.ToDateTime(reader.GetDateTime(1)).ToString("yyyy-MM-dd"),
                                    tratamiento = (reader["tratamiento"] as object[]).Cast<string>().ToList(),
                                    procedimiento = (reader["procedimiento"] as object[]).Cast<string>().ToList()
                                };

                                historialClinico.Add(registro);
                            }

                            return historialClinico;
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
