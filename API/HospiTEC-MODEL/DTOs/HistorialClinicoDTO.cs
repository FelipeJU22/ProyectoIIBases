using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_MODEL.DTOs
{
    public class HistorialClinicoDTO
    {
        public int cedulaPaciente {  get; set; }
        public string fechaProcedimiento { get; set; }
        public List<string> tratamiento { get; set; }
        public List<string> procedimiento { get; set; }
    }
}
