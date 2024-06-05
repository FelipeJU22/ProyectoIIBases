using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_MODEL
{
    public class ReservacionModificar
    {
        public int ID {  get; set; }
        public int CedulaPaciente { get; set; }
        public int NumeroCama { get; set; }
        public string FechaIngreso { get; set; }
        public string FechaSalida { get; set; }
        public string NombrePaciente { get; set; }
        public List<string> Procedimientos { get; set; }
    }
}
