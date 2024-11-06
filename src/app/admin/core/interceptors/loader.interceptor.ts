import {HttpHandlerFn, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoaderService} from "@admin/core/services/loader.service";
import {finalize, tap} from "rxjs";

export const loaderInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {

  const loader: LoaderService = inject(LoaderService);

  loader.on();

  return next(req).pipe(
    finalize(() => {
      loader.off();
    })
  );
};
