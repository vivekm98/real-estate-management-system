using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApi.Data;
using RealEstateApi.Models;

namespace RealEstateApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IWebHostEnvironment _env;

        public CategoryController(ApiDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // ADD CATEGORY
        [HttpPost("add")]
        public async Task<IActionResult> AddCategory([FromForm] string name, [FromForm] IFormFile image)
        {
            try
            {
                if (image == null || image.Length == 0)
                    return BadRequest("A valid image is required");

                // Use _env.WebRootPath to target the actual wwwroot folder
                if (string.IsNullOrEmpty(_env.WebRootPath))
                {
                    return StatusCode(500, "Server configuration error: wwwroot not found.");
                }

                string folder = Path.Combine(_env.WebRootPath, "CategoryImages");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                var category = new Category
                {
                    Name = name,
                    ImageUrl = "/CategoryImages/" + fileName
                };

                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

                return Ok(category);
            }
            catch (Exception ex)
            {
                // This prevents the backend from stopping and tells you WHY it failed
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // UPDATE CATEGORY
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromForm] string name, [FromForm] IFormFile? image)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);
                if (category == null) return NotFound();

                category.Name = name;

                if (image != null && image.Length > 0)
                {
                    string folder = Path.Combine(_env.WebRootPath, "CategoryImages");

                    if (!Directory.Exists(folder))
                        Directory.CreateDirectory(folder);

                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                    string filePath = Path.Combine(folder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    category.ImageUrl = "/CategoryImages/" + fileName;
                }

                await _context.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Update failed: {ex.Message}");
            }
        }

        // GET ALL
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return NotFound();

            // Optional: Delete the physical image file here if needed

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Deleted successfully" });
        }
    }
}