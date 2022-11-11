import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Carta } from '../componentes-comunes/classes/Carta.class';
import { Destinatario } from '../componentes-comunes/classes/Solicitud.class';
import { Servicios } from '../componentes-comunes/services/servicios.service';
import { PlantillasComponetComponent } from '../plantillas-componet/plantillas-componet.component';
declare let $: any;

@Component({
  selector: 'app-editar-component',
  templateUrl: './editar-component.component.html',
  styleUrls: ['./editar-component.component.scss']
})
export class EditarComponentComponent implements OnInit {
  carta?: Carta;
  @ViewChild('registroForm') registroForm?: PlantillasComponetComponent | any;

  isLinear = false;
  cartaForm: FormGroup;
  empleado?: Carta;

  nombreDestinatario?: string;
  apellidoDestinatario?: string;
  direccionDestinatario?: string;
  numeroDestinatario?: string;
  correoDestinatario?: string;

  headerColumnNames: string[] = ['seleccionar', 'nombreDestinatario', 'apellidoDestinatario'];
  selection = new SelectionModel<Destinatario>(true, []);
  dataSource = new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
    private services: Servicios
  ) {
    this.cartaForm = this.fb.group({
      cuerpo: ["", Validators.required],
      remitente: ["", Validators.required],
      puesto: ["", Validators.required],
      telefono: ["", Validators.required],
    });
  }

  ngOnInit() {

    this.obtenerDestinatarios();
  }

  public limpiar() {
    this.cartaForm.reset();
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
      : this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  /**
  * Metodo para generar Carta
  */
  async generarPDF() {
    Swal.fire({
      title: "Generando Carta",
      allowEscapeKey: false,
      allowOutsideClick: false
    });
    const destinatario = this.selection.selected.map(item => item.idDestinatario)
    this.obtenerDestinatarioById(destinatario);
    this.empleado = await this.services.getData<Carta>(this.services.BASE_URL_DEST, `obtener/destinatario/${destinatario}`, null).toPromise();
    Swal.showLoading();
    const solicitud = this.cartaForm.value;

    this.empleado.nombreDestinatario = this.nombreDestinatario;
    this.empleado.apellidoDestinatario = this.apellidoDestinatario;
    this.empleado.direccionDestinatario = this.direccionDestinatario;
    this.empleado.numeroDestinatario = this.numeroDestinatario;
    this.empleado.correoDestinatario = this.correoDestinatario;
    this.empleado.cuerpo = solicitud.cuerpo;
    this.empleado.remitente = solicitud.remitente;
    this.empleado.puesto = solicitud.puesto;
    this.empleado.telefono = solicitud.telefono;
    console.log(this.empleado);

    const enviarCorreo = {
      email: this.correoDestinatario,
      subject: 'NO RESPONDER, MENSAJE GENERADO DESDE EL SISTEMA',
      cuerpoMensaje: solicitud.cuerpo,
      nombreRemitente: solicitud.remitente,
      puesto: solicitud.puesto,
      teléfono: solicitud.telefono

    }

    this.services.postData(this.services.BASE_URL_DEST, 'util/enviarEmail/AdminCorreos', enviarCorreo).toPromise();

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
          title: 'Carta Generada con exito'
        })

      });
      this.registroForm.generar();
      this.limpiar();
    }, 1000)
  }

  public async obtenerDestinatarioById(idSolicitud: any) {
    const res = await this.services
      .getData<Destinatario>(this.services.BASE_URL_DEST, `obtener/destinatario/${idSolicitud}`, null)
      .toPromise()
    console.log(res);
    this.nombreDestinatario = res.nombreDestinatario;
    this.apellidoDestinatario = res.apellidoDestinatario;
    this.direccionDestinatario = res.direccionDestinatario;
    this.numeroDestinatario = res.numeroDestinatario;
    this.correoDestinatario = res.correoDestinatario;
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
