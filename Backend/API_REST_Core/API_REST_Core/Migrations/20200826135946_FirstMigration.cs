using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API_REST_Core.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gateways",
                columns: table => new
                {
                    _id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    serialnumber = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    ipv4address = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gateways", x => x._id);
                });

            migrationBuilder.CreateTable(
                name: "Devices",
                columns: table => new
                {
                    _id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    number = table.Column<int>(nullable: false),
                    vendor = table.Column<string>(nullable: true),
                    datecreated = table.Column<DateTime>(nullable: false),
                    status = table.Column<bool>(nullable: false),
                    _idGateway = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Devices", x => x._id);
                    table.ForeignKey(
                        name: "FK_Devices_Gateways__idGateway",
                        column: x => x._idGateway,
                        principalTable: "Gateways",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Gateways",
                columns: new[] { "_id", "ipv4address", "name", "serialnumber" },
                values: new object[] { 1, "192.168.0.1", "Santiago de Cuba", "43037b77003e7491720075c92b834a9cbd2e706d7687e0e0cbdbee5d4b0e5421" });

            migrationBuilder.InsertData(
                table: "Devices",
                columns: new[] { "_id", "_idGateway", "datecreated", "number", "status", "vendor" },
                values: new object[] { 1, 1, new DateTime(2020, 8, 26, 9, 59, 35, 721, DateTimeKind.Local), 1, true, "Huawei Co" });

            migrationBuilder.CreateIndex(
                name: "IX_Devices__idGateway",
                table: "Devices",
                column: "_idGateway");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Devices");

            migrationBuilder.DropTable(
                name: "Gateways");
        }
    }
}
