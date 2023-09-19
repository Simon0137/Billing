using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Billing.Utils;

namespace Billing.Controllers
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
        public Task<Customer?> GetCustomerByIdAsync([FromRoute] int id, CancellationToken cancellationToken = default)
        {
            return _db.Customers.FirstOrDefaultAsync(customer => customer.Id == id, cancellationToken);
        }

        [HttpPost]
        public async Task AddCustomerAsync([FromBody] Customer customer, CancellationToken cancellationToken = default)
        {
            await _db.Customers.AddAsync(customer, cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);
        }

        [HttpPut]
        public async Task EditCustomerAsync([FromBody] Customer customer, CancellationToken cancellationToken = default)
        {
            await _db.Customers.AddAsync(customer, cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);
        }

        [HttpDelete("{id}")]
        public async Task DeleteCustomerByIdAsync([FromRoute] int id, CancellationToken cancellationToken = default)
        {
            var customer = await _db.Customers.FindAsync(id, cancellationToken);
            if (customer != null)
            {
                _db.Customers.Remove(customer);
                await _db.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
