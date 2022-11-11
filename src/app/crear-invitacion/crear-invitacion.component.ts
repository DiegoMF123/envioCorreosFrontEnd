import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Invitacion } from '../componentes-comunes/classes/Invitacion.class';
import { Destinatario } from '../componentes-comunes/classes/Solicitud.class';
import { Servicios } from '../componentes-comunes/services/servicios.service';
import { InvitacionComponent } from '../plantillas-componet/invitacion/invitacion.component';


@Component({
  selector: 'app-crear-invitacion',
  templateUrl: './crear-invitacion.component.html',
  styleUrls: ['./crear-invitacion.component.scss']
})
export class CrearInvitacionComponent implements OnInit {

  invitacion: Invitacion;
  @ViewChild('registroForm') registroForm: InvitacionComponent;

  isLinear = false;
  invitacionForm: FormGroup;
  empleado: Invitacion;

  nombreDestinatario: string;
  apellidoDestinatario: string;

  headerColumnNames: string[] = ['seleccionar', 'nombreDestinatario', 'apellidoDestinatario'];
  selection = new SelectionModel<Destinatario>(true, []);
  dataSource = new MatTableDataSource();
  constructor(
    private fb: FormBuilder,
    private services: Servicios
  ) {
    this.invitacionForm = this.fb.group({
      cuerpo: ["", Validators.required],
      remitente: ["", Validators.required],
      direccion: ["", Validators.required],
      fecha: ["", Validators.required],
      hora: ["", Validators.required],
      telefono: ["", Validators.required],
    });
   }

  ngOnInit(){
    this.obtenerDestinatarios();
  }

  public limpiar() {
    this.invitacionForm.reset();
  }
  public regresar() {
    this.services.forcedNavigate(['menu']);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

   /**
  * Metodo para generar Invitacion
  */
    async generarPDF() {
      Swal.fire({
        title: "Generando Invitacion",
        allowEscapeKey: false,
        allowOutsideClick: false
      });
      const destinatario = this.selection.selected.map(item => item.idDestinatario)
      this.obtenerDestinatarioById(destinatario);
      this.empleado = await this.services.getData<Invitacion>(this.services.BASE_URL_DEST, `obtener/destinatario/${destinatario}`, null).toPromise();
      Swal.showLoading();
      const solicitud = this.invitacionForm.value;
  
      this.empleado.nombreDestinatario = this.nombreDestinatario;
      this.empleado.apellidoDestinatario = this.apellidoDestinatario;
      this.empleado.cuerpo = solicitud.cuerpo
      this.empleado.remitente = solicitud.remitente;
      this.empleado.direccion = solicitud.direccion;
      this.empleado.fecha = moment(solicitud.fecha).format("DD/MM/YYYY");
      this.empleado.hora = solicitud.hora;
      this.empleado.telefono = solicitud.telefono;
      console.log(this.empleado);
  
      setTimeout(() => {
        this.registroForm.onFinished(async () => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            showLoaderOnConfirm: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: "success",
            iconHtml: '<span class="mat-icon notranslate material-icons mat-icon-no-color">upload</span>',
            title: 'Invitacion Generada con exito'
          })
  
        });
        this.registroForm.generar();
        this.limpiar();
      }, 1000)
    }
  
    public async obtenerDestinatarioById(idSolicitud) {
      const res = await this.services
        .getData<Destinatario>(this.services.BASE_URL_DEST, `obtener/destinatario/${idSolicitud}`, null)
        .toPromise()
      console.log(res);
      this.nombreDestinatario = res.nombreDestinatario;
      this.apellidoDestinatario = res.apellidoDestinatario;

      return res;
    }
  
    async obtenerDestinatarios() {
      this.services.getData<Destinatario[]>(this.services.BASE_URL_DEST, `obtener/destinatarios`).toPromise().then(async res => {
        this.dataSource.data = res;
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
}
