using Billing.Db;
using Billing.Db.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Billing.Controllers
{
    public class CustomersController : AppController
    {
        public CustomersController(DatabaseContext db) : base(db)
        {
        }

        [HttpGet]
        public Task<Customer[]> GetCustomersAsync(CancellationToken cancellationToken = default)
        {
            return Db.Customers.ToArrayAsync(cancellationToken);
        }

        [HttpGet("{id}")]
        public Task<Customer?> GetCustomerByIdAsync([FromRoute] int id, CancellationToken cancellationToken = default)
        {
            return Db.Customers.FirstOrDefaultAsync(customer => customer.Id == id, cancellationToken);
        }

        [HttpPost]
        public async Task<Customer> AddCustomerAsync([FromBody] Customer customer, CancellationToken cancellationToken = default)
        {
            Db.Entry(customer).State = EntityState.Added;
            await Db.SaveChangesAsync(cancellationToken);
            return customer;
        }

        [HttpPut]
        public async Task<Customer> EditCustomerAsync([FromBody] Customer customer, CancellationToken cancellationToken = default)
        {
            Db.Entry(customer).State = EntityState.Modified;
            await Db.SaveChangesAsync(cancellationToken);
            return customer;
        }

        [HttpDelete("{id}")]
        public async Task DeleteCustomerByIdAsync([FromRoute] int id, CancellationToken cancellationToken = default)
        {
            var customer = await Db.Customers.FindAsync(id, cancellationToken);
            if (customer != null)
            {
                Db.Customers.Remove(customer);
                await Db.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
