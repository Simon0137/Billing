using Billing.Db;
using Billing.Db.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Billing.Controllers
{
    public class SubscribesController : CRUDController<Subscribe>
    {
        public SubscribesController(DatabaseContext db): base(db) { }

        [HttpGet("ByCustomerId/{customerId}")]
        public async Task<ICollection<Subscribe?>> GetByCustomerIdAsync([FromRoute] int customerId, CancellationToken cancellationToken)
        {
            var res = await GetQuery()
                //.Include(s => s.Service)
                .Where(s => s.CustomerId == customerId)
                .ToArrayAsync(cancellationToken);
            return res;
        }
    }
}
