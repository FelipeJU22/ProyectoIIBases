using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_MODEL.DTOs
{
    public class ReservacionDTO
    {
        public int cedulaPaciente {  get; set; }
        public string fechaIngreso { get; set; }
        public string fechaSalida { get; set; }
        public string nombrePaciente { get; set; }
        public List<string> procedimientos { get; set; }
    }
}
