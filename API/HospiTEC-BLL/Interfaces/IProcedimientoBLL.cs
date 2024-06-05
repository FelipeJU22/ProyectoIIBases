using HospiTEC_MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Interfaces
{
    public interface IProcedimientoBLL
    {
        public void CrearProcedimientoBLL(Procedimiento procedimiento);
        public List<Procedimiento> GetAllProcedimientosBLL();
        public void ModificarProcedimientoBLL(Procedimiento procedimiento);

    }
}
