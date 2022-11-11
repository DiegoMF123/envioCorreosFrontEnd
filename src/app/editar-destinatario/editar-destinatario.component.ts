import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Destinatario } from '../componentes-comunes/classes/Solicitud.class';
import { Servicios } from '../componentes-comunes/services/servicios.service';

@Component({
  selector: 'app-editar-destinatario',
  templateUrl: './editar-destinatario.component.html',
  styleUrls: ['./editar-destinatario.component.scss']
})
export class EditarDestinatarioComponent implements OnInit {

  destinatarioForm: FormGroup;
  destinatario?: Destinatario;
  destinatarios?: Destinatario[]
  dest: any;
  
  headerColumnNames: string[] = ['idDestinatario','nombreDestinatario', 'apellidoDestinatario', 'direccionDestinatario', 'numeroDestinatario', 'correoDestinatario', 'accion'];
  dataSource = (new MatTableDataSource()) as any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild('close') close: any;
  constructor(
    private services: Servicios,
    private _formBuilder: FormBuilder
  ) { 
    this.destinatarioForm = this._formBuilder.group({
      nombreDestinatario: [null, Validators.required],
      apellidoDestinatario: [null, Validators.required],
      direccionDestinatario: [null, Validators.required],
      numeroDestinatario: [null, Validators.required],
      correoDestinatario: [null, Validators.required],
    });  
  
  }

  ngOnInit(): void {
    this.obtenerDestinatarios(); 
    this.dataSource.paginator = this.paginator;
  }


  async obtenerDestinatarios() {
    this.services.getData<Destinatario[]>(this.services.BASE_URL_DEST, `obtener/destinatarios`).toPromise().then(async res => {
      this.dataSource.data = res;
      this.destinatarios = res;

      console.log(res);
      this.dataSource.paginator = this.paginator;
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

    /* Metodo para editar un revisor */
    editar(destinatario: Destinatario) {
      this.destinatario = destinatario;
      this.fillAdminFormEdit(destinatario);
    }


    fillAdminFormEdit(destinatario?: Destinatario) {
      this.destinatarioForm.get('nombreDestinatario')?.setValue(destinatario?.nombreDestinatario);
      this.destinatarioForm.get('apellidoDestinatario')?.setValue(destinatario?.apellidoDestinatario);
      this.destinatarioForm.get('direccionDestinatario')?.setValue(destinatario?.direccionDestinatario);
      this.destinatarioForm.get('numeroDestinatario')?.setValue(destinatario?.numeroDestinatario);
      this.destinatarioForm.get('correoDestinatario')?.setValue(destinatario?.correoDestinatario);
    }



     /* Metodo para guardar un revisor */
  async guardar() {
   
    const nombreDestinatario = this.destinatarioForm.value.nombreDestinatario;
    const apellidoDestinatario = this.destinatarioForm.value.apellidoDestinatario;
    const direccionDestinatario = this.destinatarioForm.value.direccionDestinatario;
    const numeroDestinatario = this.destinatarioForm.value.numeroDestinatario;
    const correoDestinatario = this.destinatarioForm.value.correoDestinatario;
    try {
      const actu: Destinatario = {
     
        nombreDestinatario: nombreDestinatario,
        apellidoDestinatario: apellidoDestinatario,
        direccionDestinatario: direccionDestinatario,
        numeroDestinatario: numeroDestinatario,
        correoDestinatario: correoDestinatario
      };
      console.log(actu);
        await this.services.putData(this.services.BASE_URL_DEST, `destinatario/actualizar/${this.destinatario?.idDestinatario}`, actu).toPromise();
        
      this.close.nativeElement.click()
      this.obtenerDestinatarios();
      return Swal.fire({
        titleText: `Se actualizo con exito`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
      });
    } catch (error) {
      console.error(error);
      return Swal.fire({
        titleText: `Error al registrar datos, por favor intente en otro momento.`,
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false
      });
    }
  }

   /* Metodo para limpiar campos */
   limpiar() {
    this.destinatarioForm.reset();
  }
 

  eliminar(persona: { idDestinatario: String; }) {

    Swal.fire({
      title: 'Confirmar Eliminación',
      text: "¿Está seguro que quiere eliminar este registro?",
      icon: 'question',
      showDenyButton: true,
      confirmButtonColor: "#1369A0",
      confirmButtonText: "Si",
      denyButtonText: "No",
      denyButtonColor: "#F44336",
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(persona.idDestinatario)
        this.services.deletePersona(persona.idDestinatario).subscribe();
        this.services.forcedNavigate(['editar-destinatario']);
        Swal.fire({
          titleText: `Se ha borrado la información`,
          icon: 'success',
          showCloseButton: true,
          showConfirmButton: false
        });
      }
    })
}
}
