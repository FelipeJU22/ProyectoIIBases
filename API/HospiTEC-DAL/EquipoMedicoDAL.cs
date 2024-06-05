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
    public class EquipoMedicoDAL
    {
        private readonly IConfiguration _configuration;

        public EquipoMedicoDAL(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void CrearEquipoMedico(EquipoMedicoDTO equipo)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "crearequipomedico";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("p_nombre", equipo.nombre);
                        comando.Parameters.AddWithValue("p_proveedor", equipo.proveedor);
                        comando.Parameters.AddWithValue("p_cantidad", equipo.cantidad);
                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public List<EquipoMedicoDTO> GetAllEquiposMedicos()
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string query = @"SELECT * FROM obtenerequiposmedicos()";

            var equipos = new List<EquipoMedicoDTO>();

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
                                EquipoMedicoDTO equipo = new EquipoMedicoDTO()
                                {
                                    nombre = respuesta["nombre"].ToString(),
                                    proveedor = respuesta["proveedor"].ToString(),
                                    cantidad = Convert.ToInt32(respuesta["cantidad"]),
                                };

                                equipos.Add(equipo);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return equipos;
        }


        public void ModificarEquipo(EquipoMedicoDTO equipo)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "modificarequipomedico";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("p_nombre", equipo.nombre);
                        comando.Parameters.AddWithValue("p_proveedor", equipo.proveedor);
                        comando.Parameters.AddWithValue("p_cantidad", equipo.cantidad);

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
