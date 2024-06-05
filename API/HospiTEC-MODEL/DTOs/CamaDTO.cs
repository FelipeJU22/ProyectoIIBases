using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_MODEL.DTOs
{
    public class CamaDTO
    {
        public int numero {  get; set; }
        public List<string> equiposMedicos { get; set; }
        public int sala { get; set; }
        public bool camaUCI { get; set; }
    }
}
