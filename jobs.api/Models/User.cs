using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace jobs.api.Models
{
    public class User : IdentityUser<int>
    {
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string About { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<UserJob> UserJobs { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }



    }
}