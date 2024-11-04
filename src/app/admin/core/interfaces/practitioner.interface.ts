import {Language} from "./language.interface";
import {Speciality} from "./speciality.interface";
import {Office} from "./office.interface";
import {Model} from "@core/models/interface/model.interface";

export interface Practitioner extends Model{
  id?: number,
  firstname: string;
  lastname: string;
  email: string;
  description?: string;
  active?: boolean;
  degrees: string;
  languages: string[];
  specialities: Speciality[];
  offices: Office[];
  password?: string;

}
