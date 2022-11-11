import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Destinatario } from '../componentes-comunes/classes/Solicitud.class';
import { Servicios } from '../componentes-comunes/services/servicios.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { Carta } from '../componentes-comunes/classes/Carta.class';

@Component({
  selector: 'app-plantillas-componet',
  templateUrl: './plantillas-componet.component.html',
  styleUrls: ['./plantillas-componet.component.scss']
})
export class PlantillasComponetComponent implements OnInit {

  @ViewChild('content') content?: ElementRef;
  @Input('destinatario') destinatario?: Carta;
  @Input('genOnInit') genOnInit = false;

  private download: (() => void) | any;
  private finished?: () => void;
  private output?: Blob;
  private generated = false;

  dia?: String;
  mes?: String;
  anio?: String;
  constructor(private services: Servicios,) { }

  ngOnInit() {
    if (this.genOnInit) this.generar();
    moment.locale("es");
    this.dia = moment().format("D")
    this.mes = moment().format("MMMM");
    this.anio = moment().format("YYYY");
  }

  async generar() {

    const div = document.getElementById('content');
    const options = {
      background: 'black',
      scrollY: 0,
      scale: 3,
      onclone: (element: any) => {
        element.getElementById('content').style.opacity = '1.0';
      },
    };


    const canvas = await html2canvas(div as any, options);
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF('p', 'cm', 'letter', true);

    const bufferX = 1.5;
    const bufferY = 0;
    const imgProps = (<any>doc).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    await doc.addImage(img, 'png', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    doc.save('Carta.pdf');
    this.download = () => {
      const blob = this.toBlob();
      var a = document.createElement("a") as HTMLAnchorElement;
      document.body.appendChild(a);
      a.classList.add('display-none');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `Carta.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }

    this.output = doc.output('blob');
    this.generated = true;

    if (this.finished) this.finished();
    // this.fontSizeInput();
  }



  descargar(): void {
    this.download();
  }

  toURL(): string {
    const blob = this.toBlob();
    var a = document.createElement("a") as HTMLAnchorElement;
    document.body.appendChild(a);
    a.classList.add('display-none');
    return window.URL.createObjectURL(blob);
  }

  toFile(): File {
    return new File([this.toBlob()], "Carta.pdf", { type: "application/pdf", lastModified: new Date().getDate(), endings: "native" });
  }

  toBlob(): Blob | any {
    if (!this.generated) throw new Error("No se ha generado el documento (Usar metodo generar primero).");
    return this.output;
  }

  onFinished(callback: () => void) {
    this.finished = callback;
  }


}
