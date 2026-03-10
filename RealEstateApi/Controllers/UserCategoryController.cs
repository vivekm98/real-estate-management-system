using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApi.Data;

namespace RealEstateApi.Controllers
{
    [Route("api/user/categories")]
    [ApiController]
    public class UserCategoryController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public UserCategoryController(ApiDbContext context)
        {
            _context = context;
        }

        // GET ALL CATEGORIES
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _context.Categories
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.ImageUrl
                })
                .ToListAsync();

            return Ok(categories);
        }

        // GET CATEGORY BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var category = await _context.Categories
                .Where(c => c.Id == id)
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.ImageUrl
                })
                .FirstOrDefaultAsync();

            if (category == null)
                return NotFound();

            return Ok(category);
        }
    }
}