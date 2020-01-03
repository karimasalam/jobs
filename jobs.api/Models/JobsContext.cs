using Microsoft.EntityFrameworkCore;
using jobs.api.Models;

namespace jobs.api.Models
{
    public class JobsContext: DbContext
    {
        public JobsContext(DbContextOptions<JobsContext> options)
            : base(options)
        {
            
        }
        public DbSet<Job> Jobs;
        public DbSet<jobs.api.Models.Job> Job { get; set; }
    }
}