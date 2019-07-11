using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersAndOrgs.Models
{
    public class Organisation
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string Adress { get; set; }
        public string Telephone { get; set; }

        public List <Attachment> Attachments { get; set; }
    }
}
