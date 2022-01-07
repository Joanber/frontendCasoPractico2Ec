import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthRoutingModule } from "./auth/auth.routing";
import { SolicitudAlumno } from "./models/solicitudAlumno.model";
import { NotpagefoundComponent } from "./notpagefound/notpagefound.component";
import { PagesRoutingModule } from "./pages/pages.routing";
import { SolicitudComponent } from "./pages/solicitud/solicitud.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  {
    path: "**",
    component: NotpagefoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
