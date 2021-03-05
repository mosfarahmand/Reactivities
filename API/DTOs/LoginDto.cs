using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public string Password { get; set; }

    }
}