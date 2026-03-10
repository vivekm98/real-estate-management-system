using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace RealEstateApi.Models
{
    public class CategoryDto
    {
        [Required]
        public string Name { get; set; }

        public IFormFile Image { get; set; }
    }
}