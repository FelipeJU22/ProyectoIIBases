using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_MODEL
{
    public class ReservacionID
    {
        public int ID {  get; set; }
        public int numeroCama {  get; set; }
        public string fechaIngreso { get; set; }
        public string nombrePaciente { get; set; }
        public List<string> procedimientos { get; set; }
    }
}
