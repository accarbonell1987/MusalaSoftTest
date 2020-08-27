using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_REST_Core.Contexts;
using API_REST_Core.Models;
using API_REST_Core.Utils;

namespace API_REST_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GatewaysController : ControllerBase
    {
        private readonly EntityFrameworkCoreDbContext _context;

        public GatewaysController(EntityFrameworkCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Gateways
        [HttpGet]
        public IEnumerable<Gateway> GetGateways()
        {
            return _context.Gateways;
        }

        // GET: api/Gateways/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGateway([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gateway = await _context.Gateways.FindAsync(id);

            if (gateway == null)
            {
                return NotFound();
            }

            return Ok(gateway);
        }

        // PUT: api/Gateways/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGateway([FromRoute] int id, [FromBody] Gateway gateway)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gateway._id)
            {
                return BadRequest();
            }

            _context.Entry(gateway).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GatewayExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Gateways
        [HttpPost]
        public async Task<IActionResult> PostGateway([FromBody] Gateway gateway)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //TODO: validate if IPv4 of the new gateway is valid
            if (!Helper.IsValidIPv4(gateway.ipv4address)) return BadRequest("The gateway has not valid IPv4 address");

            _context.Gateways.Add(gateway);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGateway", new { id = gateway._id }, gateway);
        }

        // DELETE: api/Gateways/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGateway([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gateway = await _context.Gateways.FindAsync(id);
            if (gateway == null)
            {
                return NotFound();
            }

            _context.Gateways.Remove(gateway);
            await _context.SaveChangesAsync();

            return Ok(gateway);
        }

        private bool GatewayExists(int id)
        {
            return _context.Gateways.Any(e => e._id == id);
        }
    }
}