using HospiTEC_MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Interfaces
{
    public interface IMongoBLL
    {
        public void AgregarEvaluacionBLL(Evaluacion evaluacion);
        public List<Evaluacion> GetAllEvaluacionesBLL();

    }
}
