using System.Collections.Generic;

namespace jobs.api.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string JobCode { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }

         public ICollection<UserJob> UserJobs { get; set; }
        
    }
}