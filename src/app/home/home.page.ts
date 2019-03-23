import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from '../services/datos.service';
import { FuncionesService } from '../services/funciones.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email = '';
  pssw = '';

  constructor( private router:    Router,
               private datos:     DatosService,
               private funciones: FuncionesService ) {
  }

  doLogin() {
    this.datos.saveSomeData( '/acceso',
                              { email: this.email,
                                clave: this.pssw },
                                true )
      .subscribe( (data)  => {  this.revisaDatos( data ); },
                  ()      => {  this.funciones.msgAlert( 'ATENCION', 'Sin conexión con el servidor. Reintente luego.' ); });
  }

  revisaDatos( data ) {
    // console.log( data );
    if ( data.resultado === 'error' ) {
        this.funciones.msgAlert('ATENCION', 'Usuario no existe en la base de datos.');
    } else {
        this.funciones.muestraySale('Hola ' + data[0].nombres, 1 );
        this.datos.saveDatoLocal( 'nsr3b_usr', data[0] );
        this.router.navigate(['/inicio']);
    }
  }

  registraMe() {
    this.router.navigate(['/registro']);
  }

}
