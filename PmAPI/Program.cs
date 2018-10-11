using PmAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.SelfHost;

namespace PmAPI
{
    public class Program
    {
        public static readonly Uri _baseAddress = new Uri("http://localhost:60061/");

        public static void Main(string[] args)
        {
            HttpSelfHostConfiguration config = new HttpSelfHostConfiguration(_baseAddress);

            config.EnableCors();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
                );

            var server = new HttpSelfHostServer(config);

            server.OpenAsync().Wait();

            ProductRepository.Connection();

            Console.WriteLine("Server running on {0}...", _baseAddress);
            Console.WriteLine("Press ENTER to exit...");

            Console.ReadLine();

            server.CloseAsync().Wait();
        }
    }
}
