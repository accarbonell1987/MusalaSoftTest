using API_REST_Core;
using API_REST_Core.Models;
using API_REST_Core.Utils;
using API_REST_Core_xUnit.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Collections.Generic;
using System.Net.Http;
using Xunit;

namespace API_REST_Core_xUnit
{
    public class UnitTest
    {

        //private readonly HttpClient _client;

        //public UnitTest() {
        //    var app = new WebApplicationFactory<Startup>();
        //    _client = app.CreateClient();
        //}

        [Fact]
        public void ValidateIpAddressTest() {
            var testgateway = new TestGateway();

            var gateway = new Gateway {
                name = "pepe",
                serialnumber = Helper.GenerateHashSerial(),
                ipv4address = "192.168.0.1.1",
                Devices = new List<Device>()
            };

            Assert.Throws<ArgumentException>(() => testgateway.GatewayInterfaceMethod(gateway));
        }
    }
}
