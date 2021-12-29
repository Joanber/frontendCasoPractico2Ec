import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { SolicitudEmpresaService } from 'src/app/services/services.models/solicitud-empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-solicitud-empresa',
  templateUrl: './add-solicitud-empresa.component.html',
  styleUrls: ['./add-solicitud-empresa.component.css'],
  providers: [DatePipe],
})
export class AddSolicitudEmpresaComponent implements OnInit {
  public solicitudEmpresa = new SolicitudEmpresa();
  public formSubmitted = false;
  //Variable fecha
  today = new Date();
  jstoday = "";

  constructor(
    private router: Router,
    private solicitudEmpresaService: SolicitudEmpresaService,
    private miDatePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) {
    this.jstoday = formatDate(
      this.today,
      "dd-MM-yyyy hh:mm:ss a",
      "en-US",
      "+0530"
    );
   }


  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarSolicitudEmpresa(id)
    );
  }

  guardarSolicitudEmpresa(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if(this.solicitudEmpresa.id){
      const fechaInicioFormat = this.miDatePipe.transform(
        this.solicitudEmpresa.fecha_inicio,
        "yyyy-MM-dd"
      );
      this.solicitudEmpresa.fecha_inicio = fechaInicioFormat;
      this.solicitudEmpresa = this.solicitudEmpresa;
      this.solicitudEmpresa.actividades = this.solicitudEmpresa.actividades;
      this.solicitudEmpresa.empresa.empresaPersonal.persona.primer_nombre = this.solicitudEmpresa.empresa.empresaPersonal.persona.primer_nombre;
      this.solicitudEmpresa.empresa.empresaPersonal.persona.primer_apellido = this.solicitudEmpresa.empresa.empresaPersonal.persona.primer_apellido;
      this.solicitudEmpresa.empresa.empresaPersonal.cargo = this.solicitudEmpresa.empresa.empresaPersonal.cargo;
      this.solicitudEmpresa.responsablePPP.carrera = this.solicitudEmpresa.responsablePPP.carrera;
      this.solicitudEmpresaService
      .editar(this.solicitudEmpresa, this.solicitudEmpresa.id)
      .subscribe((solicitudEmpresa) => {
        Swal.fire(
          "Actualizar Solicitud",
          `¡${solicitudEmpresa.id} actualizada con exito!`,
          "success"
        );
        this.irListaSolicitudesEmpresas();
      });
    }else{
      if(this.solicitudEmpresa.id){
        const fechaInicioFormat = this.miDatePipe.transform(
          this.solicitudEmpresa.fecha_inicio,
          "yyyy-MM-dd"
        );
        this.solicitudEmpresa.fecha_inicio = fechaInicioFormat;
        this.solicitudEmpresa = this.solicitudEmpresa;
        this.solicitudEmpresa.actividades = this.solicitudEmpresa.actividades;
        this.solicitudEmpresa.empresa.empresaPersonal.persona.primer_nombre = this.solicitudEmpresa.empresa.empresaPersonal.persona.primer_nombre;
        this.solicitudEmpresa.empresa.empresaPersonal.persona.primer_apellido = this.solicitudEmpresa.empresa.empresaPersonal.persona.primer_apellido;
        this.solicitudEmpresa.empresa.empresaPersonal.cargo = this.solicitudEmpresa.empresa.empresaPersonal.cargo;
        this.solicitudEmpresa.responsablePPP.carrera = this.solicitudEmpresa.responsablePPP.carrera;
        this.solicitudEmpresaService
        .crear(this.solicitudEmpresa)
        .subscribe((solicitudEmpresa) =>{
          Swal.fire(
            "Nueva Solicitud",
            `¡ Convocatoria creada con exito!`,
            "success"
          );
            this.irListaSolicitudesEmpresas();
        });
      }
    }
  }

  cargarSolicitudEmpresa(id: number) {
    if (!id) {
      return;
    }
    this.solicitudEmpresaService
      .getSolicitudEmpresaById(id)
      .subscribe((solicitudEmpresa) => {
        if (!solicitudEmpresa) {
          return this.irListaSolicitudesEmpresas();
        }
        this.solicitudEmpresa = solicitudEmpresa;
      });
  }



  irListaSolicitudesEmpresas() {
    this.router.navigateByUrl("/dashboard/list-solicitud-empresa");
  }

}
