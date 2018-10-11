using MongoDB.Bson;
using MongoDB.Driver;
using PmAPI.Models;
using PmAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PmAPI.Repositories
{
    public class ProductRepository : IProductRepository
    {
        public static IMongoClient client;
        public static IMongoDatabase db;
        public static IMongoCollection<Product> collection;

        public static void Connection()
        {
            client = new MongoClient();
            db = client.GetDatabase("sample");
            collection = db.GetCollection<Product>("product");
        }

        public async Task<List<Product>> GetAll()
        {
            return await collection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<List<Product>> GetById(string id)
        {
            var filter = Builders<Product>.Filter.Eq("_id", ObjectId.Parse(id));
            var result = await collection.Find(filter).ToListAsync();

            return result;
        }

        public async Task Insert(Product details)
        {
            await collection.InsertOneAsync(details);
        }

        public async Task<bool> Update(string id, Product item)
        {
            var filter = Builders<Product>.Filter.Eq("_id", ObjectId.Parse(id));
            var update = Builders<Product>.Update
                .Set("name", item.Name)
                .Set("brand", item.Brand)
                .Set("type", item.Type);

            var result = await collection.UpdateOneAsync(filter, update);

            return result.ModifiedCount != 0;
        }

        public async Task<bool> DeleteById(string id)
        {
            var filter = Builders<Product>.Filter.Eq("_id", ObjectId.Parse(id));
            var result = await collection.DeleteOneAsync(filter);

            return result.DeletedCount != 0;
        }
    }
}
