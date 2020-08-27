using API_REST_Core.Models;
using API_REST_Core.Utils;
using Microsoft.EntityFrameworkCore;
using System;

namespace API_REST_Core.Contexts
{
    public class EntityFrameworkCoreDbContext : DbContext
    {
        #region Builders
        public EntityFrameworkCoreDbContext(DbContextOptions<EntityFrameworkCoreDbContext> options) : base(options) {
            Database.EnsureCreated();
        }
        #endregion

        #region Override Methods
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Gateway>()
                .HasData(
                new Gateway() {
                    _id = 1,
                    serialnumber = Helper.GenerateHashSerial(),
                    name = "Santiago de Cuba",
                    ipv4address = "192.168.0.1"
                });
            modelBuilder.Entity<Device>()
                .HasData(
                new Device() {
                    _idGateway = 1,
                    _id = 1,
                    number = 1,
                    datecreated = DateTime.Now,
                    vendor = "Huawei Co",
                    status = true,
                });

            base.OnModelCreating(modelBuilder);
        }
        #endregion

        #region DbSets
        public DbSet<Gateway> Gateways { get; set; }
        public DbSet<Device> Devices { get; set; }
        #endregion
    }
}
