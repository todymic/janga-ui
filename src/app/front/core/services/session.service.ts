import { Injectable } from '@angular/core';
import {Appointment} from "@core/models/appointment";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  saveItem(keyItem: string, valueItem: unknown) {
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem(keyItem, JSON.stringify(valueItem));
    }
  }

  getItem(item: string) {
    if(typeof localStorage !== 'undefined' && localStorage.getItem(item) !== 'undefined') {
      const foundItem = localStorage.getItem(item);
      return foundItem && foundItem != 'undefined' ? JSON.parse(foundItem) : null;
    }

    return null;
  }
}
