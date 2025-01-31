﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_REST_Core.Contexts;
using API_REST_Core.Models;
using API_REST_Core.Utils;
using System.Threading;

namespace API_REST_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly EntityFrameworkCoreDbContext _context;

        public DevicesController(EntityFrameworkCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Devices
        [HttpGet]
        public IEnumerable<Device> GetDevices()
        {
            return _context.Devices;
        }

        // GET: api/Devices/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDevice([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var device = await _context.Devices.FindAsync(id);

            if (device == null)
            {
                return NotFound();
            }

            return Ok(device);
        }

        // GET: api/Devices/Gateway/5
        [HttpGet("gateway/{id}")]
        public IEnumerable<Device> GetDevicesFromGateWay([FromRoute] int id) {
            var devices = _context.Devices.Where(p => p._idGateway == id).ToList();
            return devices;
        }

        // PUT: api/Devices/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDevice([FromRoute] int id, [FromBody] Device device)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != device._id)
            {
                return BadRequest();
            }

            _context.Entry(device).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeviceExists(id))
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

        // POST: api/Devices
        [HttpPost]
        public async Task<IActionResult> PostDevice([FromBody] Device device)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //check the devices in the gateway
            var devices = _context.Devices.Where(p => p._idGateway == device._idGateway).ToList();
            if (devices.Count() == 10) return BadRequest("The gateway has maximum allowed devices");

            //controled serial number by the backend
            device.uid = Helper.GenerateHashSerial();
            device.datecreated = DateTime.Now;
            Thread.Sleep(120);

            _context.Devices.Add(device);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDevice", new { id = device._id }, device);
        }

        // DELETE: api/Devices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevice([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var device = await _context.Devices.FindAsync(id);
            if (device == null)
            {
                return NotFound();
            }

            _context.Devices.Remove(device);
            await _context.SaveChangesAsync();

            return Ok(device);
        }

        private bool DeviceExists(int id)
        {
            return _context.Devices.Any(e => e._id == id);
        }
    }
}