import {Speciality} from "./speciality.interface";
import {Office} from "./office.interface";
import {Model} from "@core/models/interface/model.interface";
import {Appointment} from "@core/models/appointment";

export interface Practitioner extends Model {
  id?: number,
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  description?: string;
  active?: boolean;
  degrees: string;
  languages: string[];
  specialities: Speciality[];
  offices: Office[];
  password?: string;
  appointments?: Appointment[]

}
