﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UsersAndOrgs.Models;

namespace UsersAndOrgs.Migrations
{
    [DbContext(typeof(ContextOrgs))]
    [Migration("20190701112357_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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

                    b.Property<int?>("OrganisationsId");

                    b.Property<string>("SecondName");

                    b.Property<string>("Surname");

                    b.HasKey("Id");

                    b.HasIndex("OrganisationsId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("UsersAndOrgs.Models.User", b =>
                {
                    b.HasOne("UsersAndOrgs.Models.Organisation", "Organisations")
                        .WithMany()
                        .HasForeignKey("OrganisationsId");
                });
#pragma warning restore 612, 618
        }
    }
}
