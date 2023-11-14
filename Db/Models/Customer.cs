namespace Billing.Db.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
        public string Gender { get; set; }
        public string TariffPlan { get; set; }
    }
}
