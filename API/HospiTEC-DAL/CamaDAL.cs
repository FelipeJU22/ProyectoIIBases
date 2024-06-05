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
    public class CamaDAL
    {
        private readonly IConfiguration _configuration;

        public CamaDAL(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void CrearCama(CamaDTO cama)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "crearcama";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("p_numerocama", cama.numero);
                        comando.Parameters.AddWithValue("p_equiposmedicos", cama.equiposMedicos);
                        comando.Parameters.AddWithValue("p_salon", cama.sala);
                        comando.Parameters.AddWithValue("p_camauci", cama.camaUCI);

                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public List<CamaDTO> GetAllCamas()
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string query = @"SELECT * FROM obtenertodaslascamas()";

            var camas = new List<CamaDTO>();

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
                                CamaDTO cama = new CamaDTO()
                                {
                                    numero = respuesta.GetInt32(0),
                                    camaUCI = respuesta.GetBoolean(1),  
                                    sala = respuesta.GetInt32(2),
                                    equiposMedicos = (respuesta["equipos"] as object[]).Cast<string>().ToList()
                                };

                                camas.Add(cama);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return camas;
        }

        public void ModificarCama(CamaDTO cama)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "modificarcama";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("p_numerocama", cama.numero);
                        comando.Parameters.AddWithValue("p_equiposmedicos", cama.equiposMedicos);
                        comando.Parameters.AddWithValue("p_salon", cama.sala);
                        comando.Parameters.AddWithValue("p_camauci", cama.camaUCI);
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
