import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponenteDestinatariosComponent } from './componente-destinatarios/componente-destinatarios.component';
import { CrearInvitacionComponent } from './crear-invitacion/crear-invitacion.component';
import { CrearSobreComponent } from './crear-sobre/crear-sobre.component';
import { EditarComponentComponent } from './editar-component/editar-component.component';
import { EditarDestinatarioComponent } from './editar-destinatario/editar-destinatario.component';
import { MenuComponent } from './menu/menu.component';
import { InvitacionComponent } from './plantillas-componet/invitacion/invitacion.component';
import { OpcionPlantillasComponent } from './plantillas-componet/opcion-plantillas/opcion-plantillas.component';
import { PlantillasComponetComponent } from './plantillas-componet/plantillas-componet.component';
import { SobreComponent } from './plantillas-componet/sobre/sobre.component';

const routes: Routes = [
  { path: 'creacion', component: ComponenteDestinatariosComponent},
  { path: 'carta', component: EditarComponentComponent},
  { path: 'sobre', component: CrearSobreComponent},
  { path: 'editar-destinatario', component: EditarDestinatarioComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'plantillas', component: OpcionPlantillasComponent},
  { path: 'invitacion', component: CrearInvitacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
