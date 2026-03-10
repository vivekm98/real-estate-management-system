using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace RealEstateApi.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        public string? PhoneNumber { get; set; }
        public string Role { get; set; } = "User";
        public ICollection<Property>? Properties { get; set; }
    }
}
