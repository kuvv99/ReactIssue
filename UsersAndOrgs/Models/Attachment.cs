using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersAndOrgs.Models
{
    public class Attachment
    {
        public int Id { get; set; }

        public int UserId { get; set; }        
        public User User { get; set; }

        public int OrganisationId { get; set; }
        public Organisation Organisation { get; set; }

    }
}
