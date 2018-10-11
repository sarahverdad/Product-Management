using PmAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PmAPI.Services
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAll();
        Task<List<Product>> GetById(string id);
        Task Insert(Product details);
        Task<bool> Update(string id, Product item);
        Task<bool> DeleteById(string id);
    }
}
