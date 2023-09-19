using Microsoft.AspNetCore.Mvc;
using Billing.Utils;

namespace Billing.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AppController : ControllerBase
    {
        protected DatabaseContext Db { get; }

        public AppController(DatabaseContext db)
        {
            Db = db;
        }
    }
}
