using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularBackend.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly DatabaseContext _db;

        public CustomersController(DatabaseContext db)
        {
            this._db = db;
        }

        [HttpGet]
        public Task<Customer[]> GetCustomersAsync(CancellationToken cancellationToken = default)
        {
            return _db.Customers.ToArrayAsync(cancellationToken);
        }

        [HttpGet("{id}")]
        public Task<Customer?> GetCustomerByIdAsync([FromRoute] int id, CancellationToken cancellationToken = default) =>
            _db.Customers.FirstOrDefaultAsync(customer => customer.Id == id, cancellationToken);

    }
}
