import {AbstractControl} from "@angular/forms";


/** type control form */
export type Control<T> = { [K in keyof T]: AbstractControl };
