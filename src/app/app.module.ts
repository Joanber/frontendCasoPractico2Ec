import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { NotpagefoundComponent } from "./notpagefound/notpagefound.component";
import { PagesModule } from "./pages/pages.module";
import { InterceptorServiceService } from "./services/interceptores/interceptor-service.service";
import { TokenInterceptor } from "./services/interceptores/token-interceptor.service";







@NgModule({
  declarations: [AppComponent, NotpagefoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorServiceService, multi: true }
  ],
})
export class AppModule {}
