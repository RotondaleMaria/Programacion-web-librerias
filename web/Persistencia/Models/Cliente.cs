using System.Collections.Generic;

namespace Persistencia.Models
{
    public class Cliente 
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }


        public List<Libro> Liibros{set;get;}
    }
}