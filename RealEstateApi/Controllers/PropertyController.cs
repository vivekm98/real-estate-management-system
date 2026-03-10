using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApi.Data;
using RealEstateApi.Models;

namespace RealEstateApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IWebHostEnvironment _env;

        public PropertyController(ApiDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // ADMIN ADD PROPERTY
        [HttpPost("add")]
        public async Task<IActionResult> AddProperty(
            [FromForm] string name,
            [FromForm] string detail,
            [FromForm] decimal price,
            [FromForm] string address,
            [FromForm] bool isTrending,
            [FromForm] int categoryId,
            [FromForm] int userId,
            [FromForm] IFormFile image)
        {

            string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "PropertyImages");

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

            string filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            var property = new Property
            {
                Name = name,
                Detail = detail,
                Price = price,
                Address = address,
                IsTrending = isTrending,
                CategoryId = categoryId,
                UserId = userId,
                ImageUrl = "/PropertyImages/" + fileName
            };

            _context.Properties.Add(property);
            await _context.SaveChangesAsync();

            return Ok(property);
        }

        // ADMIN GET ALL PROPERTIES
        [HttpGet]
        public async Task<IActionResult> GetProperties()
        {
            var properties = await _context.Properties
                .Include(p => p.Category)
                .Include(p => p.User)
                .ToListAsync();

            return Ok(properties);
        }

        // ADMIN GET PROPERTY BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var property = await _context.Properties
                .Include(p => p.Category)
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (property == null)
                return NotFound();

            return Ok(property);
        }

        // ADMIN UPDATE PROPERTY
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProperty(
            int id,
            [FromForm] string name,
            [FromForm] string detail,
            [FromForm] decimal price,
            [FromForm] string address,
            [FromForm] bool isTrending,
            [FromForm] int categoryId,
            [FromForm] int userId,
            [FromForm] IFormFile? image)
        {

            var property = await _context.Properties.FindAsync(id);

            if (property == null)
                return NotFound();

            property.Name = name;
            property.Detail = detail;
            property.Price = price;
            property.Address = address;
            property.IsTrending = isTrending;
            property.CategoryId = categoryId;
            property.UserId = userId;

            if (image != null)
            {
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "PropertyImages");

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                property.ImageUrl = "/PropertyImages/" + fileName;
            }

            await _context.SaveChangesAsync();

            return Ok(property);
        }

        // ADMIN DELETE PROPERTY
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var property = await _context.Properties.FindAsync(id);

            if (property == null)
                return NotFound();

            _context.Properties.Remove(property);
            await _context.SaveChangesAsync();

            return Ok("Property Deleted");
        }
    }
}