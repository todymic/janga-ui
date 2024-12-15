import {AbstractControl} from "@angular/forms";
import {Model} from "@core/models/interface/model.interface";
import {Reason} from "@core/models/reason";


/** type control form */
export type Control<T> = { [K in keyof T]: AbstractControl };

export type StepBooking = {  [ key: string ]: Model };

export type BookingData = { reasons: Reason[] };

