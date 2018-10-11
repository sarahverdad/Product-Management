using PmAPI.Models;
using PmAPI.Repositories;
using PmAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PmAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ProductsController : ApiController
    {
        public readonly IProductRepository _product = new ProductRepository();

        [HttpGet]
        [Route("api/products")]
        public async Task<List<Product>> GetProducts()
        {
            var prod = _product.GetAll();

            return await prod;
        }

        [HttpGet]
        [Route("api/products/{id}")]
        public async Task<List<Product>> GetProductById(string id)
        {
            var prod = _product.GetById(id);

            return await prod;
        }

        [HttpPost]
        [Route("api/products")]
        public IHttpActionResult PostInsertProduct(Product det)
        {
            if (ModelState.IsValid)
            {
                _product.Insert(det);

                return Ok("A new product is successfully added.");
            }

            return BadRequest("Oops, there's an error!");
        }

        [HttpPut]
        [Route("api/products")]
        public IHttpActionResult PutUpdateProduct(string id, Product item)
        {
            if (ModelState.IsValid)
            {
                _product.Update(id, item);

                return Ok("A product is successfully updated.");
            }

            return BadRequest(ModelState);
        }

        [HttpDelete]
        [Route("api/products")]
        public IHttpActionResult DeleteProduct(string id)
        {
            if (ModelState.IsValid)
            {
                _product.DeleteById(id);

                return Ok("A product is successfully deleted.");
            }

            return BadRequest("Oops, there's an error!");
        }
    }
}
