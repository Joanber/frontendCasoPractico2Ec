import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NotpagefoundComponent } from "./notpagefound/notpagefound.component";
import { PagesModule } from "./pages/pages.module";
import { AuthModule } from "./auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
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
  ],
})
export class AppModule {}
