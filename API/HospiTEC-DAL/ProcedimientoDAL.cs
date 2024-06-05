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

namespace HospiTEC_DAL
{
    public class ProcedimientoDAL
    {
        private readonly IConfiguration _configuration;

        public ProcedimientoDAL(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void CrearProcedimiento(Procedimiento procedimiento)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "crearprocedimiento";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("p_nombre", procedimiento.nombre);
                        comando.Parameters.AddWithValue("p_diasrecuperacion", procedimiento.diasRecuperacion);

                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<Procedimiento> GetAllProcedimientos()
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string query = @"SELECT * FROM obtenerprocedimientos()";

            var procedimientos = new List<Procedimiento>();

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
                                Procedimiento procedimiento = new Procedimiento()
                                {
                                    nombre = respuesta["nombre_procedimiento"].ToString(),
                                    diasRecuperacion = Convert.ToInt32(respuesta["dias_recuperacion"]),
                                };

                                procedimientos.Add(procedimiento);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return procedimientos;
        }


        public void ModificarProcedimiento(Procedimiento procedimiento)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "modificarprocedimiento";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("p_nombre", procedimiento.nombre);
                        comando.Parameters.AddWithValue("p_diasrecuperacion", procedimiento.diasRecuperacion);

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
