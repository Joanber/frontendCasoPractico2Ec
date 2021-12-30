import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ActaDR } from "src/app/models/actaDR.model";
import { ActividadesActasDR } from "src/app/models/actividadesActasDR.model";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { ActaService } from "src/app/services/services.models/acta.service";
import { DesignacionTaService } from "src/app/services/services.models/designacion-ta.service";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";

@Component({
  selector: "app-add-seguimiento",
  templateUrl: "./add-seguimiento.component.html",
  styleUrls: ["./add-seguimiento.component.css"],
})
export class AddSeguimientoComponent implements OnInit {
  public designacionTA = new DesignacionTA();
  public validacionSac = new ValidacionSAC();
  public actividades_actasdr: ActividadesActasDR[] = [];
  public actaDR = new ActaDR();

  constructor(
    private designacionTAService: DesignacionTaService,
    private validacionesSacService: ValidacionesSacService,
    private actaDRService: ActaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ ida }) =>
      this.getDesignacionTAByAlumnoId(ida)
    );
  }

  private getDesignacionTAByAlumnoId(ida: number) {
    if (!ida) {
      return;
    } else {
      this.designacionTAService
        .getDesignacionTAByAlumnoId(ida)
        .subscribe((designacionTA) => {
          this.designacionTA = designacionTA;
        });
      this.validacionesSacService
        .getValidacionSacByAlumnoId(ida)
        .subscribe((validacionSac) => (this.validacionSac = validacionSac));
      this.actaDRService.getActaRDByAlumnoId(ida).subscribe((actaDR) => {
        this.actaDR = actaDR;
        this.actividades_actasdr = this.actaDR.actividadesActasDR;
      });
    }
  }
}
