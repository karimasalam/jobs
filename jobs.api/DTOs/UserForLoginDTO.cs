using System.ComponentModel.DataAnnotations;

namespace jobs.api.DTOs
{
    public class UserForLoginDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}