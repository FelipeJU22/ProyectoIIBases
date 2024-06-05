using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using HospiTEC_MODEL;
using MongoDB.Bson;

namespace HospiTEC_DAL
{
    public class MongoDAL
    {
        private readonly IMongoDatabase _database;

        public MongoDAL(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDBConnection"));
            _database = client.GetDatabase("HospiTec");
        }

        public void AgregarEvaluacion(Evaluacion evaluacion)
        {
            var collection = _database.GetCollection<Evaluacion>("Evaluacion");
            collection.InsertOne(evaluacion);
        }

        public List<Evaluacion> GetAllEvaluaciones()
        {
            var collection = _database.GetCollection<Evaluacion>("Evaluacion");
            var projection = Builders<Evaluacion>.Projection.Exclude("_id");
            var evaluaciones = collection.Find(new BsonDocument()).Project<Evaluacion>(projection).ToList();
            return evaluaciones;
        }

    }
}
