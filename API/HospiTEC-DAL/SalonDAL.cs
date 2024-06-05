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
    public class SalonDAL
    {
        private readonly IConfiguration _configuration;

        public SalonDAL(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void CrearSalon(Salon salon)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "crearsalon";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("p_numsalon", salon.numeroSalon);
                        comando.Parameters.AddWithValue("p_nombresalon", salon.nombreSalon);
                        comando.Parameters.AddWithValue("p_capacidad", salon.capacidad);
                        comando.Parameters.AddWithValue("p_piso", salon.piso);
                        comando.Parameters.AddWithValue("p_genero", salon.genero);

                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<Salon> GetAllSalon()
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string query = @"SELECT * FROM obtenertodoslossalones()";

            var salones = new List<Salon>();

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
                                Salon salon = new Salon()
                                {
                                    numeroSalon = Convert.ToInt32(respuesta["numsalon"]),
                                    nombreSalon = respuesta["nombresalon"].ToString(),
                                    capacidad = Convert.ToInt32(respuesta["capacidad"]),
                                    piso = respuesta["piso"].ToString(),
                                    genero = respuesta["genero"].ToString(),
                                };

                                salones.Add(salon);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return salones;

        }

        public void EliminarSalon(int numeroSalon)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "eliminarsalon";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("p_numsalon", numeroSalon);
                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void ModificarSalon(Salon salon)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "modificarsalon";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("p_numsalon", salon.numeroSalon);
                        comando.Parameters.AddWithValue("p_nombresalon", salon.nombreSalon);
                        comando.Parameters.AddWithValue("p_capacidad", salon.capacidad);
                        comando.Parameters.AddWithValue("p_piso", salon.piso);
                        comando.Parameters.AddWithValue("p_genero", salon.genero);

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