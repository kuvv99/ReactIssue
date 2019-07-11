using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UsersAndOrgs.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using UsersAndOrgs.Models.Dto;

namespace UsersAndOrgs.Controllers
{
    public class HomeController : Controller
    {
        private ContextOrgs _orgsDataBase;
        private IMapper _mapper;

        public HomeController(ContextOrgs context, IMapper mapper)
        {         
            _orgsDataBase = context;
            _mapper = mapper;    
        }

        public IActionResult Index()
        {           
            return View();
        }

        // Return all list of the users and their organisations.
        public async Task<IEnumerable<UserDto>> GetUsersAndOrgs()
        {
            return (await _orgsDataBase.Users
               .Include(user => user.Attachments)
               .ThenInclude(attachment=>attachment.Organisation)
               .ToListAsync()).Select(item=>_mapper.Map<UserDto>(item));
        }
  
        // Return only organisations.
        public async Task<IEnumerable<OrganisationDto>> GetOrganisations()
        {         
            return (await _orgsDataBase.Organisations.ToListAsync())
                .Select(item=>_mapper.Map<OrganisationDto>(item));
        }

        // Create and add new organisation in the database.
        public async Task<IEnumerable<OrganisationDto>> AddOrganisation([FromBody] NewOrganisationFromClient organisation)
        {
            _orgsDataBase.Organisations.Add(new Models.Organisation()
            {
                FullName = organisation.Name,
                ShortName = organisation.ShortName,
                Adress = organisation.Adress,
                Telephone = organisation.Telephone
            });

            await _orgsDataBase.SaveChangesAsync();

            return (await _orgsDataBase.Organisations.ToListAsync())
                .Select(item => _mapper.Map<OrganisationDto>(item));
        }


        // Update choosen organisation with changes.
        public async Task<IEnumerable<User>> UpdateOrganisation([FromBody] NewOrganisationFromClient organisation, int id)
        {
            var updatingOrganisation = await _orgsDataBase.Organisations
                .Where(selectedOrganisation => selectedOrganisation.Id == id)
                .FirstOrDefaultAsync();

            updatingOrganisation.FullName = organisation.Name;
            updatingOrganisation.ShortName = organisation.ShortName;
            updatingOrganisation.Adress = organisation.Adress;
            updatingOrganisation.Telephone = organisation.Telephone;

            _orgsDataBase.Organisations.Update(updatingOrganisation);

            await _orgsDataBase.SaveChangesAsync();

            return (await _orgsDataBase.Users
              .Include(user => user.Attachments)
              .ThenInclude(attachment => attachment.Organisation)
              .ToListAsync());
        }

        // Remove choosen organisation from the database.
        public async Task<IEnumerable<OrganisationDto>> RemoveOrganisation(int id)
        {
            var organisation = await _orgsDataBase.Organisations
                .Where(org => org.Id == id)
                .FirstOrDefaultAsync();

            _orgsDataBase.Remove(organisation);

            await _orgsDataBase.SaveChangesAsync();

            return (await _orgsDataBase.Organisations.ToListAsync())
              .Select(item => _mapper.Map<OrganisationDto>(item));
        }

        // Create and new user into the database.
        public async Task<IEnumerable<UserDto>> AddUser([FromBody] NewUserInfoFromClient info)
        {
            var tmp = info.Name;
            var oneUser = new Models.User()
             {
                 Name = info.Name,
                 SecondName = info.SecondName,
                 Surname = info.Surname,                 
                 EMail = info.EMail,
                 Attachments = new List <Attachment>()
             };            

             for (int i = 0; i < info.OrgsIds.Length; i++)
             {
                 oneUser.Attachments.Add(new Attachment()
                 {
                     OrganisationId = info.OrgsIds[i],
                     UserId = oneUser.Id
                 });
             }

             await _orgsDataBase.Users.AddAsync(oneUser);

             await _orgsDataBase.SaveChangesAsync();
              
            return (await _orgsDataBase.Users
             .Include(user => user.Attachments)
             .ThenInclude(attachment => attachment.Organisation)
             .ToListAsync())
             .Select(item=> _mapper.Map<UserDto>(item));
        }

        // Update choosen user with new changes.
        public async Task<IEnumerable<User>> UpdateUser([FromBody] NewUserInfoFromClient changedUser, int id)
        {
            var updateUser = await _orgsDataBase.Users
                .Where(selectedUser => selectedUser.Id == id)
                .FirstOrDefaultAsync();

            updateUser.Name = changedUser.Name;
            updateUser.SecondName = changedUser.SecondName;
            updateUser.Surname = changedUser.Surname;
            updateUser.EMail = changedUser.EMail;
            updateUser.Attachments = new List<Attachment>();

            for (int i = 0; i < changedUser.OrgsIds.Length; i++)
            {
                updateUser.Attachments.Add(new Attachment()
                {
                    OrganisationId = changedUser.OrgsIds[i],
                    UserId = updateUser.Id
                });
            }

            _orgsDataBase.Users.Update(updateUser);

            await _orgsDataBase.SaveChangesAsync();

            return (await _orgsDataBase.Users
              .Include(user => user.Attachments)
              .ThenInclude(attachment => attachment.Organisation)
              .ToListAsync());
        }

        // Remove choosen user from the database.
        public async Task<IEnumerable<UserDto>> RemoveUser(int id)
        {

            var removingUser = await _orgsDataBase.Users
                .Where(user => user.Id == id)
                .FirstOrDefaultAsync();

            _orgsDataBase.Users.Remove(removingUser);

            await _orgsDataBase.SaveChangesAsync();

            return (await _orgsDataBase.Users
              .Include(user => user.Attachments)
              .ThenInclude(attachment => attachment.Organisation)
              .ToListAsync())
              .Select(item=>_mapper.Map<UserDto>(item));
        }
        
    }
}
