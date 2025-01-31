﻿// <auto-generated />
using System;
using API_REST_Core.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API_REST_Core.Migrations
{
    [DbContext(typeof(EntityFrameworkCoreDbContext))]
    [Migration("20200827181004_Change_Device_Properties")]
    partial class Change_Device_Properties
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("API_REST_Core.Models.Device", b =>
                {
                    b.Property<int>("_id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("_idGateway");

                    b.Property<DateTime>("datecreated");

                    b.Property<string>("number");

                    b.Property<bool>("status");

                    b.Property<string>("vendor");

                    b.HasKey("_id");

                    b.HasIndex("_idGateway");

                    b.ToTable("Devices");

                    b.HasData(
                        new { _id = 1, _idGateway = 1, datecreated = new DateTime(2020, 8, 27, 14, 10, 3, 897, DateTimeKind.Local), number = "76b988fe84760d87839627a6dc29e7d92e7a0b07e4e9015eee0b2c362b7be01d", status = true, vendor = "Huawei Co" }
                    );
                });

            modelBuilder.Entity("API_REST_Core.Models.Gateway", b =>
                {
                    b.Property<int>("_id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ipv4address");

                    b.Property<string>("name");

                    b.Property<string>("serialnumber");

                    b.HasKey("_id");

                    b.ToTable("Gateways");

                    b.HasData(
                        new { _id = 1, ipv4address = "192.168.0.1", name = "Santiago de Cuba", serialnumber = "76b988fe84760d87839627a6dc29e7d92e7a0b07e4e9015eee0b2c362b7be01d" }
                    );
                });

            modelBuilder.Entity("API_REST_Core.Models.Device", b =>
                {
                    b.HasOne("API_REST_Core.Models.Gateway", "gateway")
                        .WithMany("devices")
                        .HasForeignKey("_idGateway")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
