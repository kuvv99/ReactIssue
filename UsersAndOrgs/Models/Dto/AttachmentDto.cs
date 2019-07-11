using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersAndOrgs.Models.Dto
{
    public class AttachmentDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int OrganisationId { get; set; }
        public OrganisationDto Organisation { get; set; }
    }
}
