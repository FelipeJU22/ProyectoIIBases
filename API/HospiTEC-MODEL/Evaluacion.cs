using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_MODEL
{
    public class Evaluacion
    {
        public int CedulaPaciente { get; set; }
        public int Aseo {  get; set; }
        public int Trato { get; set; }
        public int Puntualidad { get; set; }
        public string Comentario { get; set; }
    }
}
