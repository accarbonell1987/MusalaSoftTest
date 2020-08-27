using API_REST_Core;
using Microsoft.AspNetCore.Mvc.Testing;
using NUnit.Framework;
using System.Net.Http;

namespace API_REST_Core_Test
{
    public class Tests
    {
        private readonly HttpClient _client;

        public Tests() {
            var app = new WebApplicationFactory<Startup>();
            _client = app.CreateClient();
        }

        [SetUp]
        public void Setup() {
        }

        [Test]
        public void Test1() {
            Assert.Pass();
        }
            
    }
}