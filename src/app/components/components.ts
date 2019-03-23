/*  para crear un modulo que sirva como componente compartido
ionic g module components
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [ FooterComponent, HeaderComponent],
  imports:      [ CommonModule, IonicModule ],
  exports:      [ FooterComponent, HeaderComponent ]
})
export class ComponentsModule {}