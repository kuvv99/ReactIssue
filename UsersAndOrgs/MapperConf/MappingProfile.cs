using AutoMapper;
using UsersAndOrgs.Models;
using UsersAndOrgs.Models.Dto;

namespace UsersAndOrgs.MapperConf
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Organisation, OrganisationDto>();
            CreateMap<Attachment, AttachmentDto>();
        }
    }
}
