using System.ComponentModel.DataAnnotations;

namespace Billing.Db.Models
{
    public class Service
    {
        [Key] public int Id { get; set; }
        public string Name { get; set; } = "";
        public string? Description { get; set; }

        public ICollection<Subscribe>? Subscribes { get; set; }
    }
}
