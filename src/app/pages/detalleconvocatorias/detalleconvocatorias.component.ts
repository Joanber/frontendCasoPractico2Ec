import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';

@Component({
  selector: 'app-detalleconvocatorias',
  templateUrl: './detalleconvocatorias.component.html',
  styleUrls: ['./detalleconvocatorias.component.css']
})
export class DetalleconvocatoriasComponent implements OnInit {
  id: number;
convocatoria: Convocatoria;
  constructor(private route: ActivatedRoute, private router: Router,
    private es: ConvocatoriasService) { }

  ngOnInit() {
    this.convocatoria = new Convocatoria();

    this.id = this.route.snapshot.params['id'];

    this.es.getConvocatoriaById(this.id)
      .subscribe(data => {
        console.log(data)
        this.convocatoria = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['/dashboard/infoconvocatoria']);
  }
}
