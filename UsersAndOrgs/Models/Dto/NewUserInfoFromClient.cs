using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersAndOrgs.Models.Dto
{
    public class NewUserInfoFromClient
    {
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string Surname { get; set; }
        public int [] OrgsIds { get; set; }
        public string EMail { get; set; }
    }
}
