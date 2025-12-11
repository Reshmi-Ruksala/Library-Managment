using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
using LibraryApi.Models;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // ================================
        // ✅ REGISTER (SIGN UP)
        // POST: api/auth/register
        // ================================
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request == null)
                return BadRequest("Invalid data");

            string email = request.Email.Trim().ToLower();

            // Check if user exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (existingUser != null)
                return BadRequest("Email already registered");

            // Create new user
            var user = new User
            {
                Name = request.Name.Trim(),
                Email = email,
                PasswordHash = PasswordHasher.Hash(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }

        // ================================
        // ✅ LOGIN
        // POST: api/auth/login
        // ================================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null)
                return BadRequest("Invalid login data");

            string email = request.Email.Trim().ToLower();

            // Find user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return BadRequest("Invalid email or password");

            // Hash the input password
            string hashedInput = PasswordHasher.Hash(request.Password);

            // Compare hashes
            if (hashedInput != user.PasswordHash)
                return BadRequest("Invalid email or password");

            // Generate JWT token
            var token = JwtTokenGenerator.GenerateToken(user, _config);

            return Ok(new
            {
                message = "Login successful",
                token = token,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email
                }
            });
        }
    }
}
