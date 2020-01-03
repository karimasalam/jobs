using System;

namespace jobs.api.DTOs
{
    public class UserForDetailDTO
    {
        public string Username { get; set; }
        public string Gender { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string About { get; set; }

        public string City { get; set; }

        public string Country { get; set; }
    }
}