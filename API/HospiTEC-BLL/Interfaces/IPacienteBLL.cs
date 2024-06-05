using HospiTEC_MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HospiTEC_BLL.Interfaces
{
    public interface IPacienteBLL
    {
        public List<Paciente> GetAllPacientesBLL();
        public void CrearPacienteBLL(Paciente paciente);
        public Paciente LoginPacienteBLL(int cedula, string contraseña);

    }
}
