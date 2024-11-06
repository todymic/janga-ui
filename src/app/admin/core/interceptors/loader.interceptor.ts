import {HttpHandlerFn, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoaderService} from "@admin/core/services/loader.service";
import {finalize, tap} from "rxjs";

export const loaderInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {

  const loader: LoaderService = inject(LoaderService);

  loader.on();
  console.log("loading onn");

  return next(req).pipe(
    finalize(() => {

      console.log("loading off")
      loader.off()
    })
  );
};
