import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Libro, genero} from '../../modelos/libro';
//import {LibroService} from '../../servicios/libro.service';
import {ActivatedRoute,Router} from '@angular/router';
import { ListadoLibrosService } from '../../servicios/listado-libros.service';

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css']
})
export class FormularioLibroComponent implements OnInit {
  formLibro:FormGroup;
  libroId:number;
  tit:string;
  generos:genero[];
  title = 'proxy'

  constructor(private fb: FormBuilder,
              //private LibroSrv:LibroService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private servicioListadoLibro: ListadoLibrosService){ }

  ngOnInit() {
    this.formLibro =this.fb.group({
        titulo:['', [Validators.required]],
        autor:['', [Validators.required]], 
        editorial:['', [Validators.required]],
        genero:['', [Validators.required]],
      });

      this.generos=[
        {id:1, descripcion: "Novela"},
        {id:2, descripcion: "Drama"},
        {id:3, descripcion: "Fantasia Romántica"},
        {id:4, descripcion: "Ficcion"},
        {id:5, descripcion: "Literatura Fantástica"},
        {id:6, descripcion: "Otros"},
      ];
  

    this.activatedRoute.params.subscribe(
    params => {
      this.libroId= params['id'];
      console.log("Libro Id: " + this.libroId);
      if(isNaN(this.libroId)){
        //no es numerico
        this.tit="Ingresar nuevo libro";
        return;
      }
      else{
        //es numerico
        var libro = this.servicioListadoLibro.Buscar(this.libroId).subscribe(
          libro => {
        this.tit="Modificar los datos del libro: " + libro.titulo + "" + libro.autor;
        //llenar el campo formulario
        this.formLibro.patchValue({
          titulo:libro.titulo,
          autor:libro.autor,
          editorial:libro.editorial,
          genero:libro.genero,
          });
        }
      )
        
    }
  }
    );
  
}

    GuardarLibro() {
    
      let libro: Libro=Object.assign({}, this.formLibro.value);
      libro.id= +this.libroId;
        if(libro.id>0){
          //editar
          console.log('editar');
          this.servicioListadoLibro.Editar(libro).subscribe(
            
            );
          this.router.navigate(["/libro"])
        }
        else{
          //nuevo
          this.servicioListadoLibro.Crear(this.formLibro.value).subscribe(
            data => {
          console.log('guardar');
  
              this.router.navigate(["/libro"])
            },
            err => console.log(err)
          );
        }
      }
  
  }


