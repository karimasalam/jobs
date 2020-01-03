using Microsoft.EntityFrameworkCore;
using jobs.api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace jobs.api.Models
{
    public class DataContext : IdentityDbContext<User, Role, int,
   IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
   IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Job> Jobs { get; set; }

    }
}