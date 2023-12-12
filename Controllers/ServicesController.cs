using Billing.Db;
using Billing.Db.Models;

namespace Billing.Controllers
{
    public class ServicesController : CRUDController<Service>
    {
        public ServicesController(DatabaseContext db) : base(db) { }
    }
}
