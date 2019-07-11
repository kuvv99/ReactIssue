using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace UsersAndOrgs.Models
{
    public class ContextOrgs:DbContext
    {
        public DbSet <User> Users { get; set; }
        public DbSet <Organisation> Organisations { get; set; }
        public DbSet <Attachment> Attachments { get; set; }

        public ContextOrgs(DbContextOptions<ContextOrgs> options) : base(options)
        {
          

        }
    }
}
