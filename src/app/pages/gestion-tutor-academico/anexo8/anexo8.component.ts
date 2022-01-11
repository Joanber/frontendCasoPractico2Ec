import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { DesignacionTaService } from "src/app/services/services.models/designacion-ta.service";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";

@Component({
  selector: "app-anexo8",
  templateUrl: "./anexo8.component.html",
  styleUrls: ["./anexo8.component.css"],
})
export class Anexo8Component implements OnInit {
  public designacionTA = new DesignacionTA();
  public validacion_sac = new ValidacionSAC();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private designacionTAService: DesignacionTaService,
    private validacionesSacService: ValidacionesSacService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.getActaByIdAlumno(id)
    );
  }

  getActaByIdAlumno(id: number) {
    if (!id) {
      this.irListaSeguimientos();
      return;
    }

    this.designacionTAService
      .getDesignacionTAByAlumnoId(id)
      .subscribe((designacionTA) => {
        if (!designacionTA) {
          this.irListaSeguimientos();
        }
        this.designacionTA = designacionTA;
      });
    this.validacionesSacService
      .getValidacionSacByAlumnoId(id)
      .subscribe((validacionSac) => {
        console.log(validacionSac);
        if (!validacionSac) {
          this.irListaSeguimientos();
        }
        this.validacion_sac = validacionSac;
      });
  }

  irListaSeguimientos() {
    this.router.navigateByUrl("/dashboard/seguimientos");
  }
}
