
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { tap, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  cualquierDato: any;
  loading: any;
  params: any;

  // puerto: NSR3B
  // public url    = 'http://23.239.29.171';  /* pruebas servidor linode */
  // public puerto = '4000';                  /* pruebas NSR3B */

  public url    = 'https://api.kinetik.cl/nsr3b' ;
  public puerto = '' ;

  constructor( private http: HttpClient,
               private loadingCtrl: LoadingController,
               private storage: Storage ) {
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
                      message: 'Rescatando',
                      duration: 7000
                    });
    return await this.loading.present();
  }

  /* funciones locales */
  saveDatoLocal( token: any, dato: any ) {
    this.storage.set( token, JSON.stringify(dato) );
  }

  async readDatoLocal(token: any) {
    const dato = await this.storage.get(token);
    this.cualquierDato = !dato ? undefined : JSON.parse( dato );
    return this.cualquierDato;
  }

  deleteDatoLocal( token: any ) {
    this.storage.remove( token ).then( () => console.log( 'DatosService.deleteDatoLocal EXISTE y REMOVIDO->', token ) );
  }

  guardarStorage( data, lista ) {
    localStorage.setItem( data, JSON.stringify( lista ) );
  }

  async cargarStorage( data ) {
    const lista = localStorage.getItem( data );
    if (lista !== 'undefined' && lista !== null) {
      return JSON.parse( lista );
    } else {
      return [];
    }
  }

  /* funciones remotas del servidor */
  getSomeData( xsp: string, datos?: any, mostrar?: boolean ) {
    // console.log( xsp, datos );
    if ( mostrar ) { this.showLoading(); }
    const body = datos;
    return this.http.post( this.url + this.puerto + xsp, body )
      .pipe( tap( value =>  { if ( this.loading && mostrar ) { this.loading.dismiss(); } }) );
  }

  saveSomeData( xsp: string, datos: any, mostrar?: boolean ) {
    // console.log( xsp, datos );
    if ( mostrar ) { this.showLoading(); }
    const body = datos;
    return this.http.post( this.url + this.puerto + xsp, body )
      .pipe( tap( value =>  { if ( this.loading && mostrar ) { this.loading.dismiss(); } }) );
  }

}
