using HospiTEC_BLL.Interfaces;
using HospiTEC_BLL.Servicios;
using HospiTEC_DAL;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Runtime.CompilerServices;

namespace HospiTEC_BLL
{
    public static class Inyeccion
    {

        public static IServiceCollection AddHospiTECServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IPersonalBLL, PersonalBLL>();
            services.AddSingleton<IPacienteBLL, PacienteBLL>();
            services.AddSingleton<IHistorialClinicoBLL, HistorialClinicoBLL>();
            services.AddSingleton<ICamaBLL, CamaBLL>();
            services.AddSingleton<IEquipoMedicoBLL, EquipoMedicoBLL>();
            services.AddSingleton<IProcedimientoBLL, ProcedimientoBLL>();
            services.AddSingleton<IReservacionBLL, ReservacionBLL>();
            services.AddSingleton<ISalonBLL, SalonBLL>();
            services.AddSingleton<IMongoBLL, MongoBLL>();


            services.AddSingleton<PersonalDAL>();
            services.AddSingleton<PacienteDAL>();
            services.AddSingleton<HistorialClinicoDAL>();
            services.AddSingleton<CamaDAL>();
            services.AddSingleton<EquipoMedicoDAL>();
            services.AddSingleton<ProcedimientoDAL>();
            services.AddSingleton<ReservacionDAL>();
            services.AddSingleton<SalonDAL>();
            services.AddSingleton<MongoDAL>();

            return services;

        }
    }
}
