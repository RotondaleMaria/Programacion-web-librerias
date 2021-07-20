using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Persistencia.Models;

namespace Persistencia
{
    public class LibreriaDbContext: DbContext
    {
        public virtual DbSet<Cliente>Clientes{set;get;}
        public virtual DbSet<Libreria>Librerias{set;get;}
        public virtual DbSet<Libro>Libros{set;get;}
        public LibreriaDbContext(){}

        public LibreriaDbContext(DbContextOptions<LibreriaDbContext> options): base(options){}
    
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
            base.OnConfiguring(optionsBuilder);

        }


    
    }

    
}