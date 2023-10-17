using Billing.Db.Models;
using Microsoft.EntityFrameworkCore;

namespace Billing.Db
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> context) : base(context)
        {
            Database.EnsureCreated();
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
