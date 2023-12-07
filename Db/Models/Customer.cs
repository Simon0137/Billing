using System.ComponentModel.DataAnnotations;

namespace Billing.Db.Models;

public class Customer
{
    public enum Genders
    {
        Undefined = 0,
        Male = 1,
        Female = 2
    }

    [Key] public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public Genders Gender { get; set; }

    public ICollection<Subscribe>? Subscribes { get; set; }
}
