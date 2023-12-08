using Billing.Db;
using Billing.Db.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Billing.Controllers
{
    public class ServicesController : AppController
    {
        public ServicesController(DatabaseContext db) : base(db)
        {
        }

        [HttpGet]
        public Task<Service[]> GetServicesAsync(CancellationToken cancellationToken = default)
        {
            return Db.Services.ToArrayAsync(cancellationToken);
        }

        [HttpGet("{id}")]
        public async Task<Service?> GetServiceByIdAsync([FromRoute] int id, CancellationToken cancellationToken = default)
        {
            var res = await Db.Services.FirstOrDefaultAsync(service => service.Id == id, cancellationToken);
            return res;
        }

        [HttpPost]
        public async Task<Service> AddServiceAsync([FromBody] Service service, CancellationToken cancellationToken = default)
        {
            Db.Entry(service).State = EntityState.Added;
            await Db.SaveChangesAsync(cancellationToken);
            return service;
        }

        [HttpPut]
        public async Task<Service> EditServiceAsync([FromBody] Service service, CancellationToken cancellationToken = default)
        {
            Db.Entry(service).State = EntityState.Modified;
            await Db.SaveChangesAsync(cancellationToken);
            return service;
        }

        [HttpDelete("{id}")]
        public async Task DeleteServiceByIdAsync([FromRoute] int id, CancellationToken cancellationToken = default)
        {
            var service = await Db.Services.FindAsync(id, cancellationToken);
            if (service != null)
            {
                Db.Services.Remove(service);
                await Db.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
