using System.ComponentModel.DataAnnotations;

namespace Billing.Db.Models
{
    public class Subscribe
    {
        public enum TariffPlans
        {
            Undefined = 0,
            Free = 1,
            Basic = 2,
            Premium = 3
        }
        [Key] public int Id { get; set; }

        public TariffPlans Tariff { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset? EndDate { get; set; }

        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }

        public int ServiceId { get; set; }
        public Service? Service { get; set; }
    }
}
