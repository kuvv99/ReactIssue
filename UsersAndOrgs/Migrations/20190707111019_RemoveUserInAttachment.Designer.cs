﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UsersAndOrgs.Models;

namespace UsersAndOrgs.Migrations
{
    [DbContext(typeof(ContextOrgs))]
    [Migration("20190707111019_RemoveUserInAttachment")]
    partial class RemoveUserInAttachment
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("UsersAndOrgs.Models.Attachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("OrganisationId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("OrganisationId");

                    b.HasIndex("UserId");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("UsersAndOrgs.Models.Organisation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Adress");

                    b.Property<string>("FullName");

                    b.Property<string>("ShortName");

                    b.Property<string>("Telephone");

                    b.HasKey("Id");

                    b.ToTable("Organisations");
                });

            modelBuilder.Entity("UsersAndOrgs.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EMail");

                    b.Property<string>("Name");

                    b.Property<string>("SecondName");

                    b.Property<string>("Surname");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("UsersAndOrgs.Models.Attachment", b =>
                {
                    b.HasOne("UsersAndOrgs.Models.Organisation", "Organisation")
                        .WithMany("GetAttachments")
                        .HasForeignKey("OrganisationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("UsersAndOrgs.Models.User")
                        .WithMany("Attachments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
