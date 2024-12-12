import {AbstractControl} from "@angular/forms";
import {Model} from "@core/models/interface/model.interface";


/** type control form */
export type Control<T> = { [K in keyof T]: AbstractControl };

export type StepBooking = {  [ key: string ]: Model };

