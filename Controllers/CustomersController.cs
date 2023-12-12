using Billing.Db;
using Billing.Db.Models;

namespace Billing.Controllers
{
    public class CustomersController : CRUDController<Customer>
    {
        public CustomersController(DatabaseContext db) : base(db) { }
    }
}
