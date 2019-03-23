import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  listaAlumnos = true  ; alumnos: any ;
  listaEventos = false ; eventos: any ;
  listaCumples = false ; cumples: any ;

  persona: any;
  url:     any;
  puerto:  any;

  constructor( private datos: DatosService,
               private funciones: FuncionesService  ) {
      this.url     = this.datos.url;
      this.puerto  = this.datos.puerto;
      this.alumnos = [];
      this.eventos = [];
      this.cumples = [];
  }

  ngOnInit() {
    this.datos.readDatoLocal( 'nsr3b_usr')
        .then( dato => {  this.persona = dato;
                          this.aBuscarAlumnos();
                          this.aBuscarEventos();
                          this.aBuscarCumples(); } );
  }

  aBuscarAlumnos() {
    // console.log(this.persona);
    this.datos.getSomeData( '/alumnos',
                          { idcurso: this.persona.idcurso } )
      .subscribe( (data) => { this.revisaData( data ); },
                  (err)  => { this.funciones.msgAlert( 'ATENCION', err );  }
                );
  }
  revisaData( data: any ) {
      // console.log( data );
      const rs    = data;
      const largo = rs.length;
      if ( rs === undefined || largo === 0 ) {
      this.funciones.msgAlert('ATENCION', 'No existen compañeros para desplegar. Intente en algun momento más adelante.');
      } else if ( largo > 0 ) {
        //
        console.log(rs);
        this.alumnos = rs;
        //
      }
  }

  aBuscarEventos() {
    // console.log(this.persona);
    this.datos.getSomeData( '/eventos',
                          { idcurso: this.persona.idcurso } )
      .subscribe( (data) => { this.revisaDataE( data ); },
                  (err)  => { this.funciones.msgAlert( 'ATENCION', err );  }
                );
  }
  revisaDataE( data: any ) {
      // console.log( data );
      const rs    = data;
      const largo = rs.length;
      if ( rs === undefined || largo === 0 ) {
      this.funciones.msgAlert('EVENTOS', 'No existen compañeros para desplegar. Intente en algun momento más adelante.');
      } else if ( largo > 0 ) {
        //
        console.log(rs);
        this.eventos = rs;
        //
      }
  }

  aBuscarCumples() {
    // console.log(this.persona);
    this.datos.getSomeData( '/cumples',
                          { idcurso: this.persona.idcurso } )
      .subscribe( (data) => { this.revisaDataC( data ); },
                  (err)  => { this.funciones.msgAlert( 'ATENCION', err );  }
                );
  }
  revisaDataC( data: any ) {
      // console.log( data );
      const rs    = data;
      const largo = rs.length;
      if ( rs === undefined || largo === 0 ) {
      this.funciones.msgAlert('CUMPLEAÑOS', 'No existen compañeros para desplegar. Intente en algun momento más adelante.');
      } else if ( largo > 0 ) {
        //
        console.log(rs);
        this.cumples = rs;
        //
      }
  }

  cambiaContenido( caso ) {
    if ( caso === 1 ) {
      this.listaAlumnos = true ;
      this.listaEventos = false;
      this.listaCumples = false;
    } else if ( caso === 2 ) {
      this.listaAlumnos = false;
      this.listaEventos = true ;
      this.listaCumples = false;
    } else if ( caso === 3 ) {
      this.listaAlumnos = false;
      this.listaEventos = false;
      this.listaCumples = true ;
    }
  }

  chat( alumno ) {
    console.log( alumno );
  }

}
