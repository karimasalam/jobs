using AutoMapper;
using jobs.api.DTOs;
using jobs.api.Models;

namespace jobs.api.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDTO, User>();
            CreateMap<User, UserForRegisterDTO>();
            CreateMap<User, UserForDetailDTO>();

        }
    }
}