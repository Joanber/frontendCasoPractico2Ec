import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService implements HttpInterceptor {

  constructor(private loderService: LoaderService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    setTimeout(() => {
      this.loderService.isLoading.next(true);
    }, 100);

    return next.handle(req).pipe(
      finalize(
        () => {
          setTimeout(() => {
            this.loderService.isLoading.next(false);
          }, 100);
        }
      )
    );
  }
}
