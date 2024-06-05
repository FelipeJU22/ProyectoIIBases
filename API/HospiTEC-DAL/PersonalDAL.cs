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
    public class PersonalDAL
    {
        private readonly IConfiguration _configuration;

        public PersonalDAL(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<Personal> GetAllPersonal()
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string query = @"SELECT * FROM obtenertodopersonal()";

            var listaPersonal = new List<Personal>();

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
                                Personal personal = new Personal()
                                {
                                    cedula = Convert.ToInt32(respuesta["cedula"]),
                                    telefono = respuesta["telefono"].ToString(),
                                    nombre = respuesta["nombre"].ToString(),
                                    apellido1 = respuesta["apellido1"].ToString(),
                                    apellido2 = respuesta["apellido2"].ToString(),
                                    direccion = respuesta["direccion"].ToString(),
                                    rol = Convert.ToInt32(respuesta["rol"]),
                                    fechaNacimiento = Convert.ToDateTime(respuesta["fechaNacimiento"]).ToString("yyyy-MM-dd"),
                                    fechaIngreso = Convert.ToDateTime(respuesta["fechaIngreso"]).ToString("yyyy-MM-dd"),
                                    contraseña = respuesta["contraseña"].ToString(),

                                };

                                listaPersonal.Add(personal);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return listaPersonal;
        }

        public void CrearPersonal(Personal personal)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "crearpersonal";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("p_cedula", personal.cedula);
                        comando.Parameters.AddWithValue("p_telefono", personal.telefono);
                        comando.Parameters.AddWithValue("p_nombre", personal.nombre);
                        comando.Parameters.AddWithValue("p_apellido1", personal.apellido1);
                        comando.Parameters.AddWithValue("p_apellido2", personal.apellido2);
                        comando.Parameters.AddWithValue("p_direccion", personal.direccion);
                        comando.Parameters.AddWithValue("p_rol", personal.rol);
                        comando.Parameters.AddWithValue("p_fechanacimiento", DateOnly.Parse(personal.fechaNacimiento));
                        comando.Parameters.AddWithValue("p_fechaingreso", DateOnly.Parse(personal.fechaIngreso));
                        comando.Parameters.AddWithValue("p_contraseña", personal.contraseña);

                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public void EliminarPersonal(int cedula)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "eliminarpersonal";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("p_cedula", cedula);
                        comando.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public Personal LoginPersonal(int cedula, string contraseña)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string funcion = "SELECT * FROM loginpersonal(@p_cedula, @p_contraseña)";
            Personal personal = null;

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
                                personal = new Personal()
                                {
                                    cedula = reader.GetInt32(0),
                                    telefono = reader.GetString(1),
                                    nombre = reader.GetString(2),   
                                    apellido1 = reader.GetString(3),
                                    apellido2 = reader.GetString(4),
                                    direccion = reader.GetString(5),
                                    rol = reader.GetInt32(6),
                                    fechaNacimiento = Convert.ToDateTime(reader.GetDateTime(7)).ToString("yyyy-MM-dd"),
                                    fechaIngreso = Convert.ToDateTime(reader.GetDateTime(8)).ToString("yyyy-MM-dd"),
                                    contraseña = reader.GetString(9)
                                };
                  
                            }
                            return personal;
                        }

                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void ModificarPersonal(Personal personal)
        {
            string baseDatos = _configuration.GetConnectionString("PostgreConnection");
            string procedAlmacenado = "modificarpersonal";

            try
            {
                using (NpgsqlConnection conexion = new NpgsqlConnection(baseDatos))
                {
                    conexion.Open();

                    using (NpgsqlCommand comando = new NpgsqlCommand(procedAlmacenado, conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("p_cedula", personal.cedula);
                        comando.Parameters.AddWithValue("p_telefono", personal.telefono);
                        comando.Parameters.AddWithValue("p_nombre", personal.nombre);
                        comando.Parameters.AddWithValue("p_apellido1", personal.apellido1);
                        comando.Parameters.AddWithValue("p_apellido2", personal.apellido2);
                        comando.Parameters.AddWithValue("p_direccion", personal.direccion);
                        comando.Parameters.AddWithValue("p_rol", personal.rol);
                        comando.Parameters.AddWithValue("p_fechanacimiento", DateOnly.Parse(personal.fechaNacimiento));
                        comando.Parameters.AddWithValue("p_fechaingreso", DateOnly.Parse(personal.fechaIngreso));
                        comando.Parameters.AddWithValue("p_contraseña", personal.contraseña);

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
