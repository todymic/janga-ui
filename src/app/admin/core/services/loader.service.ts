import {computed, Injectable, Signal, signal} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

 private _loading = signal<boolean>(false);
 show: Signal<boolean> = computed(() => this._loading());

 off() {
   this._loading.set(false);
 }

 on() {
   this._loading.set(true);
 }

}
