using System.Collections.Generic;

namespace Persistencia.Models
{
    public class Libro
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Autor { get; set; }
        public string  Editorial { get; set; }
        public string Genero { get; set; }
        public bool Stock { get; set; }

        public List<Cliente> Clientes{set;get;}

    }
}