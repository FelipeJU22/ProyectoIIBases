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
    public class PacienteDAL
    {
        private readonly IConfiguration _configuration;

        public PacienteDAL(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<Paciente> GetAllPacientes()
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string query = @"SELECT * FROM obtenertodospacientes()";

            var pacientes = new List<Paciente>();

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
                                Paciente paciente= new Paciente()
                                {
                                    cedula = Convert.ToInt32(respuesta["cedula"]),
                                    telefono = respuesta["telefono"].ToString(),
                                    nombre = respuesta["nombre"].ToString(),
                                    apellido1 = respuesta["apellido1"].ToString(),
                                    apellido2 = respuesta["apellido2"].ToString(),
                                    direccion = respuesta["direccion"].ToString(),
                                    fechaNacimiento = Convert.ToDateTime(respuesta["fechaNacimiento"]).ToString("yyyy-MM-dd"),
                                    patologias = (respuesta["patologias"] as object[]).Cast<string>().ToList(),
                                    tratPatologia = (respuesta["tratamientos"] as object[]).Cast<string>().ToList(),
                                    contraseña = respuesta["contraseña"].ToString(),
                                };

                                pacientes.Add(paciente);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return pacientes;
        }

        public void CrearPaciente(Paciente paciente)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "crearpaciente";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("p_cedula", paciente.cedula);
                        comando.Parameters.AddWithValue("p_telefono", paciente.telefono);
                        comando.Parameters.AddWithValue("p_nombre", paciente.nombre);
                        comando.Parameters.AddWithValue("p_apellido1", paciente.apellido1);
                        comando.Parameters.AddWithValue("p_apellido2", paciente.apellido2);
                        comando.Parameters.AddWithValue("p_direccion", paciente.direccion);
                        comando.Parameters.AddWithValue("p_patologias", paciente.patologias);
                        comando.Parameters.AddWithValue("p_tratpatologia", paciente.tratPatologia);
                        comando.Parameters.AddWithValue("p_fechanacimiento", DateOnly.Parse(paciente.fechaNacimiento));
                        comando.Parameters.AddWithValue("p_contraseña", paciente.contraseña);


                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public Paciente LoginPaciente(int cedula, string contraseña)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string funcion = "SELECT * FROM loginpaciente(@p_cedula, @p_contraseña)";
            Paciente paciente = null;

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(funcion, conexion))
                    {
                        comando.Parameters.AddWithValue("p_cedula", cedula);
                        comando.Parameters.AddWithValue("p_contraseña", contraseña);

                        using (var reader = comando.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                paciente = new Paciente()
                                {
                                    cedula = reader.GetInt32(0),
                                    telefono = reader.GetString(1),
                                    nombre = reader.GetString(2),
                                    apellido1 = reader.GetString(3),
                                    apellido2 = reader.GetString(4),
                                    direccion = reader.GetString(5),
                                    fechaNacimiento = Convert.ToDateTime(reader.GetDateTime(6)).ToString("yyyy-MM-dd"),
                                    contraseña = reader.GetString(7),
                                    patologias = (reader["patologias"] as object[]).Cast<string>().ToList(),
                                    tratPatologia = (reader["tratamiento"] as object[]).Cast<string>().ToList(),
                                };

                            }
                            return paciente;
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
