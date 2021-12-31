import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButton, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';

export interface Componente {
  simbol: string;
  data: any;
}
@Component({
  selector: 'app-acreditacion-ppp',
  templateUrl: './acreditacion-ppp.component.html',
  styleUrls: ['./acreditacion-ppp.component.css']
})
export class AcreditacionPppComponent implements OnInit {
  // @ViewChild('cert', null) cert: ElementRef;
  @ViewChild(MatButton, null) button: MatButton;

  constructor(public dialog: MatDialog) {}
  today: string;
  date = new Date();

  componentes: Componente[] = [
    {
      simbol: `-`,
      data: ` 240 horas de prácticas laborales,
                de naturaleza profesional en contextos reales de aplicación.`,
    },
    {
      simbol: `-`,
      data: ` 160 horas de Prácticas de servicio comunitario, cuya naturaleza es la atención a personas,
                grupos o contextos de vulnerabilidad.`,
    }
  ];

  ngOnInit() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    this.today = this.date.toLocaleDateString(undefined, options);
  }

  get bodyCertificado(): string {
    const estudiante = 'ÁLVAREZ TOLEDO JÉSSICA GUADALUPE';
    const cedula = '0107340093';
    const carrera = 'Tecnología Superior en Desarrollo de Software';
    const body = `Una vez revisada la documentación entregada por el estudiante <b>${ estudiante }</b>,
    portadora de la cédula de ciudadanía número <b>${ cedula }</b>, de la carrera de <b>${ carrera }</b>
    del Instituto Superior Tecnológico del Azuay ha cumplido con todos los requisitos establecidos
            en la ley para acreditar <b>SATISFACTORIAMENTE</b> las <b>400 horas</b> de prácticas pre profesionales,
            las cuales fueron desarrolladas cumpliendo con los dos componentes dispuestos en el Artículo 53
            del Reglamento de Régimen Académico y en el proyecto de la carrera correspondiente:`;
    // this.cert.nativeElement.innerHTML = body;
    return body;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAcreditacionComponent, {
      data: {
        date: this.date, today: this.today, componentes: this.componentes, bodyCertificado: this.bodyCertificado
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${ result }`);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: 'info',
          title: `Generando Acreditacion`,
        });
      }
    });
  }

}
export interface DialogData {
  date: Date;
  today: string;
  componentes: Componente;
  bodyCertificado: string;

}

@Component({
  selector: 'app-dialog-acreditacion',
  templateUrl: './dialog-acreditacion.html',
  styleUrls: ['./dialog-acreditacion.css']
})
export class DialogAcreditacionComponent implements AfterViewInit {
  @ViewChild('bodyCertificado', null) bodyCertificado: ElementRef;
  constructor(public dialogRef: MatDialogRef<DialogAcreditacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngAfterViewInit(): void {
      this.bodyCertificado.nativeElement.innerHTML = this.data.bodyCertificado;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
