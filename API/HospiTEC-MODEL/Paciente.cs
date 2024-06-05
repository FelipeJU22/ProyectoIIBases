using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_MODEL
{
    public class Paciente
    {
        public int cedula { get; set; }
        public string telefono { get; set; }
        public string nombre { get; set; }
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public string direccion { get; set; }
        public List<string> patologias { get; set; }
        public List<string> tratPatologia{ get; set; }
        public string fechaNacimiento { get; set; }
        public string contraseña { get; set; }
    }
}
