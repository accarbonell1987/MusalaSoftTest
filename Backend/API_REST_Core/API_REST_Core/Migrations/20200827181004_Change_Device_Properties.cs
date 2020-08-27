using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API_REST_Core.Migrations
{
    public partial class Change_Device_Properties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "number",
                table: "Devices",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "_id",
                keyValue: 1,
                columns: new[] { "datecreated", "number" },
                values: new object[] { new DateTime(2020, 8, 27, 14, 10, 3, 897, DateTimeKind.Local), "76b988fe84760d87839627a6dc29e7d92e7a0b07e4e9015eee0b2c362b7be01d" });

            migrationBuilder.UpdateData(
                table: "Gateways",
                keyColumn: "_id",
                keyValue: 1,
                column: "serialnumber",
                value: "76b988fe84760d87839627a6dc29e7d92e7a0b07e4e9015eee0b2c362b7be01d");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "number",
                table: "Devices",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Devices",
                keyColumn: "_id",
                keyValue: 1,
                columns: new[] { "datecreated", "number" },
                values: new object[] { new DateTime(2020, 8, 26, 9, 59, 35, 721, DateTimeKind.Local), 1 });

            migrationBuilder.UpdateData(
                table: "Gateways",
                keyColumn: "_id",
                keyValue: 1,
                column: "serialnumber",
                value: "43037b77003e7491720075c92b834a9cbd2e706d7687e0e0cbdbee5d4b0e5421");
        }
    }
}
