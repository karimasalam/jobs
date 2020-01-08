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
        public DbSet<UserJob> UsersJobs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserJob>()
                .HasKey(uj => new { uj.UserId, uj.JobId });
            builder.Entity<UserJob>()
               .HasOne(uj => uj.User)
               .WithMany(b => b.UserJobs)
               .HasForeignKey(uj => uj.UserId);
            builder.Entity<UserJob>()
                .HasOne(uj => uj.Job)
                .WithMany(c => c.UserJobs)
                .HasForeignKey(uj => uj.JobId);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

                userRole.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            });

        }

    }
}