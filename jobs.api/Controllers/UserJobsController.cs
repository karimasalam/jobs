using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using jobs.api.Models;
using System.Security.Claims;

namespace jobs.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserJobsController : ControllerBase
    {
        private readonly DataContext _context;

        public UserJobsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/UserJobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserJob>>> GetUsersJobs()
        {
            return await _context.UsersJobs.ToListAsync();
        }

        // GET: api/UserJobs/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserJob(int id)
        {
             if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            // var jobs =  await _context.Users.Include(uj => uj.UserJobs).ThenInclude(j => j.Job).Where(u => u.Id == id).Select(nu => new {
            //     jobs = nu.UserJobs.Select (us => new {job = us.Job})
            // }).ToListAsync();

            var jobs = await _context.Users.Where(u => u.Id == id).Select(uj => new {userjobs = uj.UserJobs.Select(i => new {i.JobId})}).ToListAsync();
         

            if (jobs == null)
            {
                return NotFound();
            }

            return Ok(jobs);
        }

        // PUT: api/UserJobs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserJob(int id, UserJob userJob)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if (id != userJob.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userJob).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserJobExists(id, userJob.JobId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserJobs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UserJob>> PostUserJob(UserJob userJob)
        {
            if (userJob.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            _context.UsersJobs.Add(userJob);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserJobExists(userJob.UserId, userJob.JobId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserJob", new { id = userJob.UserId }, userJob);
        }

        // DELETE: api/UserJobs/5/1
        [HttpDelete("{UserId}/{JobId}")]
        public async Task<ActionResult<UserJob>> DeleteUserJob(int UserId, int JobId)
        {
            if (UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var userJob = await _context.UsersJobs.FindAsync(UserId, JobId);
            if (userJob == null)
            {
                return NotFound();
            }

            _context.UsersJobs.Remove(userJob);
            await _context.SaveChangesAsync();

            return userJob;
        }

        private bool UserJobExists(int UserId, int JobId)
        {
            return _context.UsersJobs.Any(e => e.UserId == UserId && e.JobId == JobId);
        }
    }
}
