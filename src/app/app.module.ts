import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlantillasComponetComponent } from './plantillas-componet/plantillas-componet.component';

import { Servicios } from './componentes-comunes/services/servicios.service';
import { MaterialModule } from './componentes-comunes/utils/material-module';
import { ComponenteDestinatariosComponent } from './componente-destinatarios/componente-destinatarios.component';
import { EditarComponentComponent } from './editar-component/editar-component.component';
import { SobreComponent } from './plantillas-componet/sobre/sobre.component';
import { CrearSobreComponent } from './crear-sobre/crear-sobre.component';
import { EditarDestinatarioComponent } from './editar-destinatario/editar-destinatario.component';
import { MenuComponent } from './menu/menu.component';
import { OpcionPlantillasComponent } from './plantillas-componet/opcion-plantillas/opcion-plantillas.component';
import { CrearInvitacionComponent } from './crear-invitacion/crear-invitacion.component';
import { InvitacionComponent } from './plantillas-componet/invitacion/invitacion.component';
@NgModule({
  declarations: [
    AppComponent,
    PlantillasComponetComponent,
    ComponenteDestinatariosComponent,
    EditarComponentComponent,
    SobreComponent,
    CrearSobreComponent,
    EditarDestinatarioComponent,
    MenuComponent,
    OpcionPlantillasComponent,
    CrearInvitacionComponent,
    InvitacionComponent
  ],
  imports: [
    BrowserModule,
    
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    Servicios,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
