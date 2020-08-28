using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using API_REST_Core;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net;
using API_REST_Core.Controllers;
using API_REST_Core.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace API_REST_Core.XUnitTest.API
{
    public class GatewayApiTest
    {
        private readonly HttpClient _client;
        private GatewaysController _controller;
        public GatewayApiTest() {
            var server = new TestServer(new WebHostBuilder().UseEnvironment("Development").UseStartup<Startup>());
            _client = server.CreateClient();
        }

        [Fact]
        public void Get_WhenCalled_ReturnsOkResult() {
            // Act
            var okResult = _controller.GetGateways();
            // Assert
            Assert.IsType<OkObjectResult>(okResult);
        }
        
        [Theory]
        [InlineData("GET", 1)]
        public async Task GatewayGetTestAsync(string method, int? id = null) {
            //Arrange
            var request = new HttpRequestMessage(new HttpMethod(method), $"/api/getways/{id}");

            //Act
            var response = await _client.SendAsync(request);

            //Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode
                .OK, response.StatusCode);
        }
    }
}
