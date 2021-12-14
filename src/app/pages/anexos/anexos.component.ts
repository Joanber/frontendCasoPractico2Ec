import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-anexos",
  templateUrl: "./anexos.component.html",
  styleUrls: ["./anexos.component.css"],
})
export class AnexosComponent implements OnInit {
  private routeSub: Subscription;
  private routeParam: string;
  private students = [
    {
      id: "0104640974",
      names: "Michael Anthony",
      last: "Padilla Heredia",
      email: "michael.padilla.est@tecazuay.edu.ec",
      phone: "0996082041",
      empTutor: "",
    },
    {
      id: "0104640992",
      names: "Jose Anthony",
      last: "Perez Hernesto",
      email: "michael.padilla.est@tecazuay.edu.ec",
      phone: "0996082041",
      empTutor: "",
    },
    {
      id: "0104640982",
      names: "Pedro Mauricio",
      last: "Ordonez Salto",
      email: "michael.padilla.est@tecazuay.edu.ec",
      phone: "0996082041",
      empTutor: "",
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params) => (this.routeParam = params["anexo"])
    );
  }

  getAnexo() {
    return this.routeParam;
  }

  downloadAnexo() {
    //TODO: DOWNLOAD FILE

    if (this.getAnexo() === "a1") {
      console.log("DOWNLOADING...", this.getAnexo());
    } else if (this.getAnexo() === "a12") {
      console.log("DOWNLOADING...", this.getAnexo());
    } else if (this.getAnexo() === "a12_1") {
      console.log("DOWNLOADING...", this.getAnexo());
    } else {
      alert(this.getAnexo() + " no existe");
    }
  }

  uploadAnexo(filePath: string) {
    //TODO: Upload File
    console.log("FILE PATH: ", filePath);

    if (this.getAnexo() === "a1") {
      console.log("UPLOADING...", this.getAnexo());
    } else if (this.getAnexo() === "a12") {
      console.log("UPLOADING...", this.getAnexo());
    } else if (this.getAnexo() === "a12_1") {
      console.log("UPLOADING...", this.getAnexo());
    } else {
      alert(this.getAnexo() + " no existe");
    }
  }

  setTutorEmpresarial(studentId: string, tutorNombre: string) {
    this.students.filter((student) => student.id === studentId)[0].empTutor =
      tutorNombre;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
