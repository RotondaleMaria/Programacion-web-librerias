using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using Persistencia.Models;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibreriasController : ControllerBase
    {
        private readonly LibreriaDbContext _context;

        public LibreriasController(LibreriaDbContext context)
        {
            _context = context;
        }

        // GET: api/Librerias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Libreria>>> GetLibrerias()
        {
            return await _context.Librerias.ToListAsync();
        }

        // GET: api/Librerias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Libreria>> GetLibreria(int id)
        {
            var libreria = await _context.Librerias.FindAsync(id);

            if (libreria == null)
            {
                return NotFound();
            }

            return libreria;
        }

        // GET: api/Librerias/buscar/palabra
        [HttpGet("buscar/{palabra}")]
        public async Task<ActionResult<IEnumerable<Libreria>>> GetSearchLibrerias(string palabra)
        {
            
            var libreria =  await _context.Librerias.Where(x=> x.Nombre.ToLower().Contains(palabra.ToLower())).ToListAsync();
            

            if (libreria == null)
            {
                return NotFound();
            }

            return libreria;
        }

        // PUT: api/Librerias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibreria(int id, Libreria libreria)
        {
            if (id != libreria.Id)
            {
                return BadRequest();
            }

            _context.Entry(libreria).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibreriaExists(id))
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

        // POST: api/Librerias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Libreria>> PostLibreria(Libreria libreria)
        {
            _context.Librerias.Add(libreria);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLibreria", new { id = libreria.Id }, libreria);
        }

        // DELETE: api/Librerias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibreria(int id)
        {
            var libreria = await _context.Librerias.FindAsync(id);
            if (libreria == null)
            {
                return NotFound();
            }

            _context.Librerias.Remove(libreria);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LibreriaExists(int id)
        {
            return _context.Librerias.Any(e => e.Id == id);
        }
    }
}
