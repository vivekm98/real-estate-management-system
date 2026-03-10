using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApi.Data;

namespace RealEstateApi.Controllers
{
    [Route("api/user/property")]
    [ApiController]
    public class UserPropertyController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public UserPropertyController(ApiDbContext context)
        {
            _context = context;
        }

        // GET ALL PROPERTIES
        [HttpGet]
        public async Task<IActionResult> GetProperties()
        {
            var properties = await _context.Properties
                .Include(p => p.Category)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.Address,
                    p.ImageUrl,
                    CategoryName = p.Category.Name
                })
                .ToListAsync();

            return Ok(properties);
        }

        // GET PROPERTY DETAILS
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var property = await _context.Properties
                .Include(p => p.Category)
                .Include(p => p.User)
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Detail,
                    p.Price,
                    p.Address,
                    p.ImageUrl,
                    p.IsTrending,
                    CategoryName = p.Category.Name,
                    OwnerName = p.User != null ? p.User.Username : null,
                    OwnerPhone = p.User != null ? p.User.PhoneNumber : null
                })
                .FirstOrDefaultAsync();

            if (property == null)
                return NotFound();

            return Ok(property);
        }

        // GET PROPERTIES BY CATEGORY
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetByCategory(int categoryId)
        {
            var properties = await _context.Properties
                .Where(p => p.CategoryId == categoryId)
                .Include(p => p.Category)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.Address,
                    p.ImageUrl,
                    CategoryName = p.Category.Name
                })
                .ToListAsync();

            return Ok(properties);
        }

        // GET TRENDING PROPERTIES
        [HttpGet("trending")]
        public async Task<IActionResult> GetTrending()
        {
            var properties = await _context.Properties
                .Where(p => p.IsTrending)
                .Include(p => p.Category)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.Address,
                    p.ImageUrl,
                    CategoryName = p.Category.Name
                })
                .ToListAsync();

            return Ok(properties);
        }
    }
}