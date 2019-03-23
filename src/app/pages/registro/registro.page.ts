import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/services/datos.service';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  rut = '';
  nombres = '';
  apellidos = '';
  direccion = '';
  comuna = '';
  nrocelu = '';
  email  = '';
  apoderado1 = '';  nroceluapo1 = '';
  apoderado2 = '';  nroceluapo2 = '';
  fechanac: Date;
  alergias = '';
  clave1 = '';  clave2 = '';
  curso = '';

  cursos: any;

  constructor( private router: Router,
               private datos: DatosService,
               private funciones: FuncionesService) { }

  ngOnInit() {
    this.datos.getSomeData( '/cursos' )
      .subscribe( (datos) => { this.cursos = datos; } );
  }

  salir() {
    this.router.navigate( ['/'] );
  }

  registrarAlumno() {
    if ( this.rut === ''  ) {
      this.funciones.msgAlert('RUT',
                              'Debe ingresar el dato correctamente. Todos los datos solicitados nos sirven. Somos un número ...snif ...snif');
      return;
    }
    if ( this.nombres === '' ) {
      this.funciones.msgAlert('NOMBRES',
                              'Debe ingresar el dato correctamente. Todos los datos solicitados nos sirven. Cómo sin nombre?.... Adán o Eva...sirve igual...');
      return;
    }
    if ( this.apellidos === '' ) {
      this.funciones.msgAlert('APELLIDOS',
                              'Debe ingresar el dato correctamente. Todos los datos solicitados nos sirven. Deberás honrar a Padre y Madre (precepto bíblico)...');
      return;
    }
    if ( this.direccion === '' ) {
      this.funciones.msgAlert('DIRECCION',
                              'Debe ingresar el dato correctamente. Todos los datos solicitados nos sirven. Washito y sin casa? Naaaa');
      return;
    }
    if ( this.comuna === '' ) {
      this.funciones.msgAlert('COMUNA',
                              'Debe ingresar el dato correctamente. Todos los datos solicitados nos sirven. Todos somos Mashuka!!');
      return;
    }
    if ( this.nrocelu === '' ) {
      this.funciones.msgAlert('NRO.CELULAR',
                              'Sin celu...Tranquilo Papá.. ya llegará!');
      return;
    }
    if ( this.email === '' ) {
      this.funciones.msgAlert('EMAIL',
                              'Sin MAIL... y la cuenta de Instagram, Pinterest, SnapChat?... yaaaa pone el dato no mah !!!');
      return;
    }
    if ( this.clave1 === '' || this.clave2 === '' || this.clave1 != this.clave2 ) {
      this.funciones.msgAlert('CLAVES',
                              'Desde el Agente 007 hasta Bill Gates, incluso Steve Jobs tenian una... y tu no tienes....Ponla ponla !!');
      return;
    }
    if ( this.curso === '' ) {
      this.funciones.msgAlert('CURSO',
                              'En tu curso estan felices de temerte como compañero... Asúmelo !!!');
      return;
    }

    this.datos.saveSomeData( '/guardaAlumno',
                              { rut:          this.rut.toUpperCase() ,
                                nombres:      this.nombres    ,
                                apellidos:    this.apellidos  ,
                                direccion:    this.direccion  ,
                                comuna:       this.comuna     ,
                                nrocelu:      this.nrocelu    ,
                                email:        this.email      ,
                                apoderado1:   this.apoderado1 ,
                                nroceluapo1:  this.nroceluapo1,
                                apoderado2:   this.apoderado2 ,
                                nroceluapo2:  this.nroceluapo2,
                                fechanac:     this.fechanac   ,
                                alergias:     this.alergias   ,
                                curso:        this.curso      ,
                                clave1:       this.clave1     },
                                true )
      .subscribe( (data)  => {  this.revisaDatos( data ); },
                  ()      => {  this.funciones.msgAlert( 'ATENCION', 'Sin conexión con el servidor. Reintente luego.' ); });
  }

  private revisaDatos( data ) {
    console.log( data );
    if ( data.resultado === 'error' ) {
        this.funciones.msgAlert('ATENCION','Los datos ingresados no pudieron ser registrados. '+
                                'Corrija o póngase en contacto con su administrador.');
    } else {
        this.funciones.msgAlert( 'YUPI !!!', 'Gracias ' + this.nombres +
        ', si deseas poner tu foto en el avatar envíala a contacto@kinetik.cl, allá verificaremos tus datos y la adjuntaremos.' );
        this.salir();
    }
  }

  // noRecuerdo() { 
  //   this.navCtrl.push( NorecuerdoPage );
  // }


}
